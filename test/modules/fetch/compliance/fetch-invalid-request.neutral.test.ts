import { FetchInterceptor } from '@mswjs/interceptors/fetch'

const interceptor = new FetchInterceptor()

beforeAll(() => {
  interceptor.apply()
})

afterAll(() => {
  interceptor.dispose()
})

it('rejects instead of throwing when the request init is invalid', async () => {
  let fetchPromise: Promise<Response> | undefined

  expect(() => {
    fetchPromise = fetch('http://localhost/resource', {
      headers: { 'x-invalid': 'a\nb' },
    })
  }).not.toThrow()

  await expect(fetchPromise).rejects.toThrow(TypeError)
})
