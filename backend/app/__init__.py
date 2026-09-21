"""Penselverket backend package."""

import sys
from pathlib import Path

# Ensure project root is always in sys.path for reliable imports
ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))
