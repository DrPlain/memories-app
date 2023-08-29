export const handleError = (error: unknown): string => {
    if (typeof error === 'string' || typeof error === 'number') {
      return String(error);
    } else if (typeof error === 'object') {
      if (error && 'message' in error) {
        return String(error.message);
      }
    }
    return 'An error occurred'
  }