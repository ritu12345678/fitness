/**
 * Role Helper Functions
 * Utility functions to work with roles from the Redux store
 */

/**
 * Get role ID by role name
 * @param {Array} roles - Array of role objects
 * @param {string} roleName - Name of the role to find
 * @returns {number|null} Role ID or null if not found
 */
export const getRoleIdByName = (roles, roleName) => {
  if (!roles || !Array.isArray(roles)) return null;
  const role = roles.find(role => role.role_name === roleName);
  return role ? role.role_id : null;
};

/**
 * Get role name by role ID
 * @param {Array} roles - Array of role objects
 * @param {number} roleId - ID of the role to find
 * @returns {string|null} Role name or null if not found
 */
export const getRoleNameById = (roles, roleId) => {
  if (!roles || !Array.isArray(roles)) return null;
  const role = roles.find(role => role.role_id === roleId);
  return role ? role.role_name : null;
};

/**
 * Get User role ID (role_id = 2)
 * @param {Array} roles - Array of role objects
 * @returns {number|null} User role ID or null if not found
 */
export const getUserRoleId = (roles) => {
  return getRoleIdByName(roles, 'User');
};

/**
 * Get Trainer role ID (role_id = 3)
 * @param {Array} roles - Array of role objects
 * @returns {number|null} Trainer role ID or null if not found
 */
export const getTrainerRoleId = (roles) => {
  return getRoleIdByName(roles, 'Trainer');
};

/**
 * Get Administrator role ID (role_id = 1)
 * @param {Array} roles - Array of role objects
 * @returns {number|null} Administrator role ID or null if not found
 */
export const getAdminRoleId = (roles) => {
  return getRoleIdByName(roles, 'Administrator');
};

/**
 * Get Super Admin role ID (role_id = 4 or 5)
 * @param {Array} roles - Array of role objects
 * @returns {number|null} Super Admin role ID or null if not found
 */
export const getSuperAdminRoleId = (roles) => {
  return getRoleIdByName(roles, 'Super Admin');
};

/**
 * Check if a role exists
 * @param {Array} roles - Array of role objects
 * @param {string} roleName - Name of the role to check
 * @returns {boolean} True if role exists
 */
export const roleExists = (roles, roleName) => {
  return getRoleIdByName(roles, roleName) !== null;
};

/**
 * Get all active roles
 * @param {Array} roles - Array of role objects
 * @returns {Array} Array of active roles
 */
export const getActiveRoles = (roles) => {
  if (!roles || !Array.isArray(roles)) return [];
  return roles.filter(role => role.status === true);
};


export const getRolesByStatus = (roles, status) => {
  if (!roles || !Array.isArray(roles)) return [];
  return roles.filter(role => role.status === status);
};

export default {
  getRoleIdByName,
  getRoleNameById,
  getUserRoleId,
  getTrainerRoleId,
  getAdminRoleId,
  getSuperAdminRoleId,
  roleExists,
  getActiveRoles,
  getRolesByStatus,
};




