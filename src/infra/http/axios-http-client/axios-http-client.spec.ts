import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest, mockGetRequest } from '@/data/test'

import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpPostClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct status code and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.post(mockPostRequest())
    const axiosResponse = await mockedAxios.post.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return the correct status code and body on failure', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})

describe('AxiosHttpGetClient', () => {
  test('Should call axios get with correct values', async () => {
    const request = mockGetRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.get(request)
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
  })

  test('Should return the correct status code and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.get(mockGetRequest())
    const axiosResponse = await mockedAxios.get.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  // test('Should return the correct status code and body on failure', () => {
  //   const { sut, mockedAxios } = makeSut()
  //   mockedAxios.post.mockRejectedValueOnce({
  //     response: mockHttpResponse()
  //   })
  //   const promise = sut.post(mockPostRequest())
  //   expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  // })
})
