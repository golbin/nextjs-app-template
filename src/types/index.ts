/**
 * 공통 타입 정의
 *
 * 앱 전반에서 사용되는 공유 타입들을 여기에 정의합니다.
 */

/**
 * API 응답 래퍼 타입
 */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * 페이지네이션 파라미터
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * 페이지네이션 결과
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * 워크스페이스 멤버 역할
 */
export type MemberRole = "owner" | "admin" | "member" | "viewer";

/**
 * 서버 액션 결과 타입
 */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

