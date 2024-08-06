import Role from "../models/role.js"

const saveRole = (req, res) =>{
    Role.create(req.body)
    .then(result => res.status(201).json({message: 'Role added successfully', role: result, status: true}))
    .catch(error => res.status(400).json({message: 'Error while adding role', error, status: false}));
}

export {saveRole}