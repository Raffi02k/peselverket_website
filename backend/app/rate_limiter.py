from __future__ import annotations

import time
from collections import defaultdict, deque
from typing import Deque
from fastapi import HTTPException, Request, status


class RateLimiter:
    def __init__(self, window_seconds: int = 15 * 60, max_requests: int = 5) -> None:
        self.window_seconds = window_seconds
        self.max_requests = max_requests
        self._requests: dict[str, Deque[float]] = defaultdict(deque)

    def get_client_ip(self, request: Request) -> str:
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "unknown"

    def check(self, request: Request) -> None:
        ip = self.get_client_ip(request)
        now = time.time()
        queue = self._requests[ip]

        while queue and now - queue[0] > self.window_seconds:
            queue.popleft()

        if len(queue) >= self.max_requests:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="För många förfrågningar. Vänligen vänta en stund och prova igen.",
            )

        queue.append(now)


rate_limiter = RateLimiter()
