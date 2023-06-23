const { createSpy } = jasmine;

export class StorageServiceStub {
    getItem = createSpy();

    setItem = createSpy();

    removeItem = createSpy();
}
