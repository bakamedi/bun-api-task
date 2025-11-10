export interface IJWT {
  sign(payload: string): string;
  verify(token: string): string;
}
