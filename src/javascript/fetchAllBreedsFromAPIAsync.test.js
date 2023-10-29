const fetchAllBreedsFromApiAsync = async (fetchFn) => {
    try {
        const allDogsFromAPIResponse = await fetchFn(allBreedsListAPIEndpoint);

        if (allDogsFromAPIResponse.ok !== true) {
            throw new Error(`Error: ${allDogsFromAPIResponse.status}`);
        }

        return allDogsFromAPIResponse.json();
    } catch (error) {
        console.log(error);
    }
};


const allBreedsListAPIEndpoint = 'https://example.com/api/breeds';

module.exports = fetchAllBreedsFromApiAsync;


describe('fetchAllBreedsFromApiAsync', () => {
    it('should return data on successful response', async () => {
        const mockResponse = {
            ok: true,
            json: async () => ({ breed1: {}, breed2: {} }),
        };

        const fetchFn = jest.fn().mockResolvedValue(mockResponse);

        const result = await fetchAllBreedsFromApiAsync(fetchFn);

        expect(result).toEqual({ breed1: {}, breed2: {} });
    });

    /*it('should handle errors properly', async () => {
        const mockResponse = {
            ok: false,
            status: 404,
        };

        const fetchFn = jest.fn().mockResolvedValue(mockResponse);

        const result = await fetchAllBreedsFromApiAsync(fetchFn);

        expect(result).toBeUndefined();

        expect(console.log).toHaveBeenCalledWith(`Error: ${mockResponse.status}`);
    });*/
/*    it('should handle errors properly', async () => {
        const mockResponse = {
            ok: false,
            status: 404,
        };

        const fetchFn = jest.fn().mockResolvedValue(mockResponse);

        const consoleLogSpy = jest.spyOn(console, 'log');

        const result = await fetchAllBreedsFromApiAsync(fetchFn);

        expect(result).toBeUndefined();

        let number = 404;
        let status = '${mockResponse.status}';
        expect(404).toHaveBeenCalledWith(mockResponse.status);

        // Restore the original console.log function to avoid affecting other tests
        consoleLogSpy.mockRestore();
    });

 */
});