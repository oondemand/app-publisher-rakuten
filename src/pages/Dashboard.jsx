import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";
import api from "../services/api";
import ServiceCard from "../components/Cards/ServiceCard";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { prestador, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true); 
  const [tickets, setTickets] = useState([]);
  const [metrics, setMetrics] = useState({
    totalTickets: 0,
    activeTickets: 0,
    archivedTickets: 0,
    servicesCount: 0,
  });

  useEffect(() => {
    // Se o usuário está autenticando, aguardamos
    if (authLoading) return;

    // Se não há prestador, não buscamos dados do Dashboard
    if (!prestador) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // console.log("Buscando dados do Dashboard...");
        // console.log("Prestador:", prestador);
        // console.log("Prestador:", prestador._id);
        if (prestador) {
          const ticketsResponse = await api.get("/tickets/prestador/" + prestador._id);
          setTickets(ticketsResponse.data);

          // Calcular métricas
          const totalTickets = ticketsResponse.data.length;
          const activeTickets = ticketsResponse.data.filter(
            (ticket) => ticket.status === "ativo"
          ).length;
          const archivedTickets = ticketsResponse.data.filter(
            (ticket) => ticket.status === "arquivado"
          ).length;
          const servicesCount = ticketsResponse.data.reduce(
            (acc, ticket) => acc + (ticket.servico ? 1 : 0),
            0
          );

          setMetrics({ totalTickets, activeTickets, archivedTickets, servicesCount });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [prestador, authLoading]); // Dependências: 'prestador' e 'authLoading'

  // Se ainda está carregando (autenticação ou dados do Dashboard)
  if (authLoading || loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6}>Dashboard</Heading>

      {!prestador && (
        <Alert status="warning" mb={6}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Prestador não cadastrado</AlertTitle>
            <AlertDescription>
              Por favor, registre-se como prestador para acessar todas as funcionalidades.
              <Button as={Link} to="/perfil-prestador" colorScheme="teal" size="sm" mt={2}>
                Registrar-se
              </Button>
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {prestador?.status === "em-analise" && (
        <Alert status="info" mb={6}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Prestador em análise</AlertTitle>
            <AlertDescription>
              Seu cadastro está em análise. Por favor, aguarde a aprovação para acessar todas as
              funcionalidades.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {prestador?.status === "pendente-de-revisao" && (
        <Alert status="warning" mb={6}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Prestador pendente de revisão</AlertTitle>
            <AlertDescription>
              Seu cadastro está pendente de revisão. Por favor, edite seus dados para continuar.
              {prestador.comentariosRevisao && (
                <Box mt={2}>
                  <strong>Comentários de Revisão:</strong>
                  <Box mt={1} p={2} bg="gray.100" borderRadius="md">
                    {prestador.comentariosRevisao}
                  </Box>
                </Box>
              )}
              <Button as={Link} to="/perfil-prestador" colorScheme="teal" size="sm" mt={2}>
                Editar Dados
              </Button>
            </AlertDescription>
          </Box>
        </Alert>
      )}

      {/* Exibir métricas somente se o prestador existir */}
      <SimpleGrid columns={[1, null, 4]} spacing={6} mb={6}>
        <Stat bg="teal.50" p={4} borderRadius="md">
          <StatLabel>Total de Tickets</StatLabel>
          <StatNumber>{metrics.totalTickets}</StatNumber>
        </Stat>
        <Stat bg="green.50" p={4} borderRadius="md">
          <StatLabel>Tickets Ativos</StatLabel>
          <StatNumber>{metrics.activeTickets}</StatNumber>
        </Stat>
        <Stat bg="yellow.50" p={4} borderRadius="md">
          <StatLabel>Tickets Arquivados</StatLabel>
          <StatNumber>{metrics.archivedTickets}</StatNumber>
        </Stat>
        <Stat bg="purple.50" p={4} borderRadius="md">
          <StatLabel>Serviços Cadastrados</StatLabel>
          <StatNumber>{metrics.servicesCount}</StatNumber>
        </Stat>
      </SimpleGrid>

      <Heading size="md" mb={4}>
        Serviços Recentes
      </Heading>
      {tickets.length > 0 ? (
        <SimpleGrid columns={[1, null, 3]} spacing={6}>
          {tickets.slice(0, 6).map((ticket) => (
            <ServiceCard key={ticket._id} ticket={ticket} />
          ))}
        </SimpleGrid>
      ) : (
        <Text>Nenhum serviço cadastrado.</Text>
      )}
    </Box>
  );
};

export default Dashboard;
