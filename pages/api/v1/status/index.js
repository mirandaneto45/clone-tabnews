function status(request, response) {
  response.status(200).json({ chave: "eu sou fodinha" });
}

export default status;
