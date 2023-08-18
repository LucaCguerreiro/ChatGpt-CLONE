const openai = require("../config/openai");
const ImputPrompt = require("../models/input-prompt");

module.exports = {
    async sendText(req, res){
        const openaiAPI = openai.configuration();
        const imputModel = new ImputPrompt(req.body)

        try{
            const response = await openaiAPI.createCompletion(
                openai.textCompletion(imputModel)
                )
        
            return res.status(200).json({
                sucess: true,
                data: response.data.choices[0].text,
            })

        }catch(error){
            return res.status(500).json({
                sucess: false,
                error: error.response ? error.response.data : "Internal Server Error",
            })
            
        }
    }
}