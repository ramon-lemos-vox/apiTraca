
// const { ObjectId } = require("mongodb");
const { connectDB, runQuery, disconnectD, addUser, getAllUsers } = require('../potsgres');


// ------------------------------------------------------------------------------------------------------------
const HelperApp = {
    startBots: async () => {
        try {
            console.log("Sistema iniciado com sucesso!");
        } catch (error) {
            console.error("Erro ao carregar bots:", error);
        }
    },


    // ///-----------------------------------------------------------------------------------------------------------------------
};
module.exports = HelperApp;

// ------------------ Funções Auxiliares ------------------
