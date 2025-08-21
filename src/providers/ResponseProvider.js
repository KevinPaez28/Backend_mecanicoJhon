export class ResponseProvider {
  
  static success(res, data, message = "Operación exitosa", status = 200) {
    return res.status(status).json({
      success: true,
      code: status,
      message,
      data,
    });
  }

  static error(res, message = "Error interno del servidor", status = 500, erros = []) {
    return res.status(status).json({
      success: false,
      code: status,
      message,
      erros: erros
    });
  }
}
