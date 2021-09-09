import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'

describe('FileHelper', () => {
  describe('getFileStatus', () => {
    test('it should return files statuses in a correct format', async () => {
      const statMock = {
        dev: 2053,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 2376683,
        size: 78902,
        blocks: 160,
        atimeMs: 1631023022162.5054,
        mtimeMs: 1631023021826.5017,
        ctimeMs: 1631023021834.502,
        birthtimeMs: 1631023021822.5017,
        atime: '2021-09-07T13:57:02.163Z',
        mtime: '2021-09-07T13:57:01.827Z',
        ctime: '2021-09-07T13:57:01.835Z',
        birthtime: '2021-09-07T13:57:01.823Z'
      }
      
      const mockUser = 'erickwendel'
      process.env.USER = mockUser
      const filename = 'file.png'

      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename])
      
      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock)

      const result = await FileHelper.getFilesStatus('/tmp')

      const expectedResult = [
        {
          
          size: '78.9 kB',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})


