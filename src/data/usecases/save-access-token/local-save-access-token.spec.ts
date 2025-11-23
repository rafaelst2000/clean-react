import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageMock } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return { sut, setStorageSpy }
}

describe('LocalSaveAccessToken', () => {
  test('Should cal SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })

  test('Should cal SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
