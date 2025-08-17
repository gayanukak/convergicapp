import random
from django.apps import apps  # deferred model lookup

SAFE_LETTERS = "abcdefghjklmnpqrstuvwxyz"
SAFE_DIGITS = "123456789"
VOWELS = "aeu"
FORMATS = [
    (3, 3),
    (3, 4),
    (2, 2, 4),
    (2, 4, 2),
]

def generate_code():
    """Generate a unique, rule-based code (best effort)."""
    Topic = apps.get_model('api', 'Topic')  # get model dynamically

    max_attempts = 100
    for _ in range(max_attempts):
        fmt = random.choice(FORMATS)
        parts = []

        for idx, length in enumerate(fmt):
            if fmt == (3, 3) and idx == 0:
                part = "".join(random.choices(SAFE_LETTERS + SAFE_DIGITS, k=length))
            elif fmt == (3, 3) and idx == 1:
                part = "".join(random.choices(SAFE_LETTERS + SAFE_DIGITS, k=length-1))
                middle = random.choice(VOWELS)
                pos = length // 2
                part = part[:pos] + middle + part[pos:]
            elif fmt in [(2,2,4),(2,4,2)]:
                if length == 2:
                    part = "".join(random.choices(SAFE_LETTERS, k=length))
                else:
                    while True:
                        part = "".join(random.choices(SAFE_LETTERS + SAFE_DIGITS, k=length))
                        if sum(c in VOWELS for c in part) <= 2:
                            break
            else:
                part = "".join(random.choices(SAFE_LETTERS + SAFE_DIGITS, k=length))
            parts.append(part)

        code = "-".join(parts)

        # Ensure uniqueness in DB
        if not Topic.objects.filter(code=code).exists():
            return code

    # Fallback in case of collisions
    return "".join(random.choices(SAFE_LETTERS + SAFE_DIGITS, k=8))
