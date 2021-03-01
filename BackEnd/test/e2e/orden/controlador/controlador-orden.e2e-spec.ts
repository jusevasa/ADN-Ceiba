import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioOrden } from 'src/dominio/orden/puerto/repositorio/repositorio-orden';
import { DaoOrden } from 'src/dominio/orden/puerto/dao/dao-orden';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { OrdenControlador } from 'src/infraestructura/orden/controlador/orden.controlador';
import { ServicioCrearOrden } from 'src/dominio/orden/servicio/servicio-crear-orden';
import { servicioCrearOrdenProveedor } from 'src/infraestructura/orden/proveedor/servicio/servicio-crear-orden.proveedor';
import { servicioActualizarOrdenProveedor } from 'src/infraestructura/orden/proveedor/servicio/servicio-actualizar-orden.proveedor';
import { servicioEliminarOrdenProveedor } from 'src/infraestructura/orden/proveedor/servicio/servicio-eliminar-orden.proveedor';
import { ManejadorCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.manejador';
import { ManejadorActualizarOrden } from 'src/aplicacion/orden/comando/actualizar-orden.manejador';
import { ManejadorEliminarOrden } from 'src/aplicacion/orden/comando/eliminar-orden.manejador';
import { ManejadorListarOrdenes } from 'src/aplicacion/orden/consulta/listar-ordenes.manejador';
import { ManejadorListarOrden } from 'src/aplicacion/orden/consulta/listar-orden.manejador';
import { ComandoCrearOrden } from 'src/aplicacion/orden/comando/crear-orden.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { ordenTestDataBuilder } from '../../../tdb/orden/orden-tdb'
import { ServicioActualizarOrden } from 'src/dominio/orden/servicio/servicio-actualizar-orden';
import { ServicioEliminarOrden } from 'src/dominio/orden/servicio/servicio-eliminar-orden';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de ordenes', () => {

  let app: INestApplication;
  let repositorioOrden: SinonStubbedInstance<RepositorioOrden>;
  let daoOrden: SinonStubbedInstance<DaoOrden>;
  const ordenTest = new ordenTestDataBuilder()
  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioOrden = createStubObj<RepositorioOrden>(['existeRepartidor', 'existeOrden', 'guardar', 'actualizar', 'eliminar'], sinonSandbox);
    daoOrden = createStubObj<DaoOrden>(['listarOrdenes', 'listarOrden'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [OrdenControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioCrearOrden,
          inject: [RepositorioOrden],
          useFactory: servicioCrearOrdenProveedor,
        },
        {
          provide: ServicioActualizarOrden,
          inject: [RepositorioOrden],
          useFactory: servicioActualizarOrdenProveedor,
        },
        {
          provide: ServicioEliminarOrden,
          inject: [RepositorioOrden],
          useFactory: servicioEliminarOrdenProveedor,
        },
        { provide: RepositorioOrden, useValue: repositorioOrden },
        { provide: DaoOrden, useValue: daoOrden },
        ManejadorCrearOrden,
        ManejadorActualizarOrden,
        ManejadorEliminarOrden,
        ManejadorListarOrdenes,
        ManejadorListarOrden
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar las ordenes', () => {

    const ordenes: any[] = [{
      idCoordinador: 2,
      idRepartidor: 1,
      fechaCreacion: "02-23-2021",
      fechaEntrega: "02-23-2021",
      horaEntrega: "15:30:00"
    }];
    daoOrden.listarOrdenes.returns(Promise.resolve(ordenes));

    return request(app.getHttpServer())
      .get('/orden')
      .expect(HttpStatus.OK)
      .expect(ordenes);
  });

  it('debería listar la orden', () => {
    const orden: any = [{
      id: 1,
      idCoordinador: 2,
      idRepartidor: 1,
      fechaCreacion: "02-23-2021",
      fechaEntrega: "02-23-2021",
      horaEntrega: "15:30:00"
    }];
    daoOrden.listarOrden.returns(Promise.resolve(orden));

    return request(app.getHttpServer())
      .get('/orden/1')
      .expect(HttpStatus.OK)
      .expect(orden);
  });

  it('debería crear la orden', () => {
    return request(app.getHttpServer())
      .post('/orden')
      .send(
        ordenTest
      )
      .expect(HttpStatus.CREATED)
      .expect(201);

  });

  // it('debería actualizar la orden', async () => {

  //   return await request(app.getHttpServer())
  //     .put('/orden/1')
  //     .send(
  //       ordenTest
  //     )
  //     .expect(200);
  // });

  // it('debería borrar la orden', async () => {
  //   repositorioOrden.existeOrden.returns(Promise.resolve(false));
  //   return await request(app.getHttpServer()).del('/orden/1').expect(200)
  // });


  it('debería fallar al ingresar una hora fuera de lo establecido', async () => {

    const orden: ComandoCrearOrden = {
      idCoordinador: 2,
      idRepartidor: 1,
      fechaCreacion: new Date(),
      fechaEntrega: new Date(),
      horaEntrega: "18:00:00"
    };
    const mensaje = 'La hora ingresada no corresponde al horario laboral';

    const response = await request(app.getHttpServer())
      .post('/orden').send(orden)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al asignar un repartidor en la misma franja horaria', async () => {
    const orden: ComandoCrearOrden = {
      idCoordinador: 2,
      idRepartidor: 1,
      fechaCreacion: new Date(),
      fechaEntrega: new Date(),
      horaEntrega: "15:00:00"
    };
    const mensaje = `El repartidor ya fue asignado en esta franja horaria`;
    repositorioOrden.existeRepartidor.returns(Promise.resolve(true));

    const response = await request(app.getHttpServer())
      .post('/orden').send(orden)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
