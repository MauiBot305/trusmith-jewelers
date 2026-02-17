// Mock for three.js in Jest tests
const THREE = {
  Mesh: jest.fn(),
  Group: jest.fn(),
  Vector3: jest.fn(() => ({ x: 0, y: 0, z: 0 })),
  Color: jest.fn(),
  MeshStandardMaterial: jest.fn(),
  TorusGeometry: jest.fn(),
  OctahedronGeometry: jest.fn(),
}

export default THREE
export const { Mesh, Group, Vector3, Color, MeshStandardMaterial } = THREE
