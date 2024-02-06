import {AllowedParameters, Direction, URLParameterManager} from '../../components/url_parameter_manager';
import {SearchLocation} from '../../components/search/search';

describe('URLParameterManager', () => {
    let manager: URLParameterManager<AllowedParameters>;

    beforeEach(() => {
        manager = new URLParameterManager<AllowedParameters>();
    });

    it('should set and get the locality', () => {
        const locality: SearchLocation = {
            name: 'Locality',
            publicId: '123',
            location: {
                lat: 1.234567,
                lng: 2.345678
            }
        };
        manager.setLocality(locality);
        const result = manager.getLocality();
        expect(result).toEqual(locality);
    });

    it('should handle undefined locality', () => {
        manager.setLocality(undefined);
        const result = manager.getLocality();
        expect(result).toBeUndefined();
    });

    it('should set and get the direction', () => {
        const direction: Direction = {
            from: {
                name: 'From',
                location: {
                    lat: 1.234567,
                    lng: 2.345678
                }
            },
            to: {
                name: 'To',
                location: {
                    lat: 3.456789,
                    lng: 4.567890
                }
            }
        };
        manager.setDirection(direction);
        const result = manager.getDirection();
        expect(result).toEqual(direction);
    });

    it('should handle undefined direction', () => {
        manager.setDirection(undefined);
        const result = manager.getDirection();
        expect(result).toBeUndefined();
    });

});
