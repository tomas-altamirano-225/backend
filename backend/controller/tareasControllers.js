const getTareas = (req, res) => {
    res.status(200).json({ "mensaje": "getTareas" });
}

const crearTareas = (req, res) => {
    res.status(201).json({ "mensaje": "createTareas" });
}

const updateTareas = (req, res) => {
    res.status(400).json({ "mensaje": `Tarea Modificada ${req.params.id}` });
}

const deleteTareas = (req, res) => {
    res.status(400).json({ "mensaje": `Tarea Borrada ${req.params.id}` });
}

module.exports = { 
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas 
};