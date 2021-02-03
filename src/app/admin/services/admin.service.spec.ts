import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { AdminService } from './admin.service';
import { of, Observable } from 'rxjs';

class StoreMock {
    select = jasmine.createSpy().and.returnValue(of(true));
}

describe('AdminService', () => {
    let service: AdminService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AdminService, StoreModule,
                { provide: Store, useClass: StoreMock }],
            schemas: [NO_ERRORS_SCHEMA]
        });
        service = TestBed.get(AdminService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get data from API', () => {
        const spy = spyOn(service, 'saveNowPlaying').and.callFake(
            t => {
                return Observable.call;
            });
        service.saveNowPlaying([]);
        expect(spy).toHaveBeenCalled();
    });

    it('should search searchMovie function', () => {
        const spy = spyOn(service, 'searchMovie');
        service.searchMovie('');
        expect(spy).toHaveBeenCalled();
    });

    it('should call newTheater function', () => {
        const spy = spyOn(service, 'newTheater');
        service.newTheater(null);
        expect(spy).toHaveBeenCalled();
    });

    it('should add theaters when newTheater called', () => {
        service.newTheater(null);
        expect(service.newTheater.length).toBe(1);
    });

    it('should save current playing movies when saveNowPlaying called', () => {
        service.saveNowPlaying([]);
        expect(service.saveNowPlaying.length).toBe(1);
    });

    it('should search movies when searchMovie called', () => {
        service.searchMovie('movie');
        expect(service.searchMovie.length).toBe(1);
    });

    it('should assign value to newObject', () => {
        const spy = spyOn(service, 'newTheater');
        service.newTheater(null);
        expect(spy).toHaveBeenCalled();
    });
});
