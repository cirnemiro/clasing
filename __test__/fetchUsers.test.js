const fetchUsers = require("../data/users");


// Mock de la función fetch para simular la llamada a la API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [/* tus datos de prueba aquí */] }),
  })
);

test('fetchUsers debe devolver datos de usuarios', async () => {
  const users = await fetchUsers();
  expect(users.results).toBeDefined();
  expect(users.results.length).toBeGreaterThan(0);
  // Puedes agregar más expectativas según tus necesidades
});