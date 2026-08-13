import { validateEmployee } from '../middleware/validation';

describe('validateEmployee middleware', () => {
  it('rejects requests with missing required employee fields', async () => {
    const req = {
      body: {
        FirstName: '',
        LastName: 'Doe',
        Email: 'john@example.com'
      }
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    const next = jest.fn();

    for (const middleware of validateEmployee) {
      await middleware(req, res, next);
    }

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Validation error'
      })
    );
  });
});
