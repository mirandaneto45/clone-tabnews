import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function statusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseMaxConnections;
  let databaseAvailableConecctions = "Carregando...";
  let databaseOpenedConnections = "Carregando...";
  let postgresVersion = "Carregando...";

  if (!isLoading && data) {
    postgresVersion = data.dependencies.database.version;
    databaseMaxConnections = Number(data.dependencies.database.max_connections);
    databaseOpenedConnections = Number(
      data.dependencies.database.opened_connections,
    );
    databaseAvailableConecctions =
      databaseMaxConnections - databaseOpenedConnections;
  }

  return (
    <>
      <div>Conexões disponíveis: {databaseAvailableConecctions}</div>
      <div>Conexões abertas: {databaseOpenedConnections}</div>
      <div>Versão do Postgres: {postgresVersion}</div>
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let UpdatedAtText = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {UpdatedAtText}</div>;
}
