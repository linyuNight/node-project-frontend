const ispro = process.env.NODE_ENV === 'pro'

export const isPro = ispro

export const baseUrl = ispro ? 'https://103.152.132.60:3333' : 'http://127.0.0.1:3333'
