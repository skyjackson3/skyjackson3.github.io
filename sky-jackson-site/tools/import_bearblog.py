#!/usr/bin/env python3
"""Convert a Bear Blog markdown export into Jekyll posts.

Bear Blog exports a folder of .md files. This script reads them, pulls out the
title and date, and writes properly named files into _posts/.

Usage:
    python3 tools/import_bearblog.py ~/Downloads/bear-export _posts

Nothing is overwritten without asking, and the original files are left alone.
"""

import os
import re
import sys
import datetime

FRONT_MATTER = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)


def slugify(text):
    text = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    return re.sub(r"[-\s]+", "-", text)[:60] or "untitled"


def parse(path):
    raw = open(path, encoding="utf-8").read()
    title, date, body = None, None, raw

    match = FRONT_MATTER.match(raw)
    if match:
        body = raw[match.end():]
        for line in match.group(1).splitlines():
            if ":" not in line:
                continue
            key, _, value = line.partition(":")
            key, value = key.strip().lower(), value.strip().strip('"\'')
            if key == "title":
                title = value
            elif key in ("date", "published_date", "publish_date"):
                date = value[:10]

    if not title:
        heading = re.search(r"^#\s+(.+)$", body, re.M)
        if heading:
            title = heading.group(1).strip()
            body = body.replace(heading.group(0), "", 1)

    if not date:
        stamp = os.path.getmtime(path)
        date = datetime.date.fromtimestamp(stamp).isoformat()

    return title or os.path.splitext(os.path.basename(path))[0], date, body.strip()


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 1

    source = sys.argv[1]
    target = sys.argv[2] if len(sys.argv) > 2 else "_posts"
    os.makedirs(target, exist_ok=True)

    written = 0
    for name in sorted(os.listdir(source)):
        if not name.endswith(".md"):
            continue
        title, date, body = parse(os.path.join(source, name))
        out = os.path.join(target, "{}-{}.md".format(date, slugify(title)))

        if os.path.exists(out):
            answer = input("{} exists. Overwrite? [y/N] ".format(out))
            if answer.strip().lower() != "y":
                continue

        safe_title = title.replace('"', "'")
        with open(out, "w", encoding="utf-8") as handle:
            handle.write('---\ntitle: "{}"\ndate: {}\n---\n\n{}\n'.format(safe_title, date, body))
        written += 1
        print("wrote", out)

    print("\nDone. {} post(s) imported. Review the front matter, then commit.".format(written))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
