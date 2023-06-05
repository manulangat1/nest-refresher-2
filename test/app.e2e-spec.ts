import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { CreateUser } from '../src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3334);
  });

  afterAll(() => {
    app.close();
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello world I am the ecommerce API');
  });

  describe('AUth', () => {
    describe('Sign Up', () => {
      it('should sign up', () => {
        const dto: any = {
          email: 'e10@gmail.com',
          password: '3050Manu!',
        };
        return pactum
          .spec()
          .post('http://localhost:3334/auth/')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Sign In', () => {
      it('should sign up', () => {
        const dto: any = {
          email: 'e9@gmail.com',
          password: '3050Manu!',
        };
        return pactum
          .spec()
          .post('http://localhost:3334/auth/token')
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });

  describe('Products', () => {
    describe('Get Product', () => {
      it.todo('should sign up');
    });

    describe('Post product', () => {
      it.todo('should sign up');
    });

    describe('Add to cart', () => {
      it.todo('should sign up');
    });
  });
});
