/**
 * Role Configuration
 * Centralized role management for the application
 */

export const ROLES = {
  SUPER_ADMIN: { id: 1, name: 'Super Admin', description: 'Full system access' },
  USER: { id: 2, name: 'User', description: 'Regular user' },
  TRAINER: { id: 3, name: 'Trainer', description: 'Fitness trainer' },
  MANAGER: { id: 4, name: 'Manager', description: 'Team manager' },
  ADMIN: { id: 5, name: 'Admin', description: 'System administrator' }
};

export const ROLE_IDS = {
  SUPER_ADMIN: 1,
  USER: 2,
  TRAINER: 3,
  MANAGER: 4,
  ADMIN: 5
};

export const ROLE_NAMES = {
  1: 'Super Admin',
  2: 'User', 
  3: 'Trainer',
  4: 'Manager',
  5: 'Admin'
};

/**
 * Get role by ID
 * @param {number} roleId - Role ID
 * @returns {object|null} Role object or null
 */
export const getRoleById = (roleId) => {
  return Object.values(ROLES).find(role => role.id === roleId) || null;
};

/**
 * Get role ID by name
 * @param {string} roleName - Role name
 * @returns {number|null} Role ID or null
 */
export const getRoleIdByName = (roleName) => {
  const role = Object.values(ROLES).find(role => 
    role.name.toLowerCase() === roleName.toLowerCase()
  );
  return role ? role.id : null;
};

/**
 * Get role name by ID
 * @param {number} roleId - Role ID
 * @returns {string|null} Role name or null
 */
export const getRoleNameById = (roleId) => {
  return ROLE_NAMES[roleId] || null;
};

/**
 * Check if role ID is valid
 * @param {number} roleId - Role ID to validate
 * @returns {boolean} True if valid
 */
export const isValidRoleId = (roleId) => {
  return Object.values(ROLE_IDS).includes(roleId);
};

/**
 * Get all role IDs
 * @returns {number[]} Array of role IDs
 */
export const getAllRoleIds = () => {
  return Object.values(ROLE_IDS);
};

/**
 * Get all roles
 * @returns {object[]} Array of role objects
 */
export const getAllRoles = () => {
  return Object.values(ROLES);
};

export default {
  ROLES,
  ROLE_IDS,
  ROLE_NAMES,
  getRoleById,
  getRoleIdByName,
  getRoleNameById,
  isValidRoleId,
  getAllRoleIds,
  getAllRoles
};




