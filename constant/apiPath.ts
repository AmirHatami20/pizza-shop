const BASE_URL =
    typeof window === 'undefined'
        ? process.env.NEXTAUTH_URL || 'http://localhost:3000'
        : '';

export const API_PATH = {
    AUTH: {
      REGISTER: `${BASE_URL}/api/auth/register`,
    },
    PRODUCT: {
        GET_ALL: `${BASE_URL}/api/product`,
        CREATE: `${BASE_URL}/api/product`,
        UPDATE: (id: string) => `${BASE_URL}/api/product/${id}`,
        DELETE: (id: string) => `${BASE_URL}/api/product/${id}`,
    },
    USER: {
        GET_ALL: `${BASE_URL}/api/user`,
        CREATE: `${BASE_URL}/api/user`,
        UPDATE: (id: string) => `${BASE_URL}/api/user/${id}`,
        DELETE: (id: string) => `${BASE_URL}/api/user/${id}`,
    },
    CATEGORY: {
        GET_ALL: `${BASE_URL}/api/category`,
        CREATE: `${BASE_URL}/api/category`,
        UPDATE: (id: string) => `${BASE_URL}/api/category/${id}`,
        DELETE: (id: string) => `${BASE_URL}/api/category/${id}`,
    },
    CART: {
        GET_ALL: `${BASE_URL}/api/cart`,
        CREATE: `${BASE_URL}/api/cart`,
    }
}