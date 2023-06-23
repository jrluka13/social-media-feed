const { createSpy } = jasmine;

export class NotificationServiceStub {
    show = createSpy();
}
