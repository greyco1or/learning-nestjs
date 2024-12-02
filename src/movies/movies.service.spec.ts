import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  //테스트 시작 전 실행되는 코드
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll test', () => {
    it('Should return an array of movies', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
      //expect(service.getAll()).toEqual([]);
    });
  });

  describe('getOne test', () => {
    it('Should return a movie', () => {
      service.create({
        title: 'TEST Movie',
        genres: ['TEST'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('Should thorw 404 error', () => {
      try {
        service.getOne(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id 99 not found');
      }
    });
  });

  describe('deleteOne test', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'TEST Movie',
        genres: ['TEST'],
        year: 2000,
      });
      const beforeDeleteCount = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteCount = service.getAll().length;
      expect(afterDeleteCount).toBeLessThan(beforeDeleteCount);
    });
  });
});
