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
      <DatabaseConnections />
      <PostgresVersion />
    </>
  );
}

function DatabaseConnections() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI);

  let databaseAvailableConecctions = "Carregando...";
  let databaseMaxConnections;
  let databaseOpenedConnections = "Carregando...";

  if (!isLoading && data) {
    databaseMaxConnections = Number(data.dependencies.database.max_connections);
    databaseOpenedConnections = Number(
      data.dependencies.database.opened_connections,
    );
    databaseAvailableConecctions =
      databaseMaxConnections - databaseOpenedConnections;
  }

  return (
    <div>
      <div>Conexões disponíveis: {databaseAvailableConecctions}</div>
      <div>Conexões abertas: {databaseOpenedConnections}</div>
    </div>
  );
}

function PostgresVersion() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI);

  let postgresVersion = "Carregando...";

  if (!isLoading && data) {
    postgresVersion = data.dependencies.database.version;
  }

  return <div>Versão do Postgres: {postgresVersion}</div>;
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
