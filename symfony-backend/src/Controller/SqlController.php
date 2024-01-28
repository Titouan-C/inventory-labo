<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\DBAL\Exception;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;

class SqlController extends AbstractController
{

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/execute-sql', name: 'execute_sql', methods: ['POST'])]
    public function prepareSqlRequest(Request $request): JsonResponse
    {
        $fetchRequestQuery = $request->query->all();
        $sqlRequestType = $fetchRequestQuery["type"];

        if ($sqlRequestType == "INSERT") {
            $requiredKeys = ["lastname", "firstname", "mail", "ecole", "role", "password"];
            foreach ($requiredKeys as $key) {
                if (!isset($fetchRequestQuery[$key])) {
                    throw new \Exception("Missing key in request: $key");
                }
            }

            $fetchRequestQuery["password"] = password_hash($fetchRequestQuery["password"], PASSWORD_DEFAULT);
            $sqlRequest = 'INSERT INTO user (lastname, firstname, mail, ecole, role, password) VALUES (?, ?, ?, ?, ?, ?)';
            $values = [
                $fetchRequestQuery["lastname"],
                $fetchRequestQuery["firstname"],
                $fetchRequestQuery["mail"],
                $fetchRequestQuery["ecole"],
                $fetchRequestQuery["role"],
                $fetchRequestQuery["password"]
            ];

            $result = $this->executeSqlRequest($sqlRequest, $values);

            return new JsonResponse(['status' => 'success', 'data' => $result]);
        } else if ($sqlRequestType == "UPDATE") {
            $requiredKeys = ["where", "lastname", "firstname", "mail", "ecole", "role"];
            foreach ($requiredKeys as $key) {
                if (!isset($fetchRequestQuery[$key])) {
                    throw new \Exception("Missing key in request: $key");
                }
            }

            $sqlRequest = 'UPDATE user SET lastname = ?, firstname = ?, mail = ?, ecole = ?, role = ?
                           WHERE mail = ?';
            $values = [
                $fetchRequestQuery["lastname"],
                $fetchRequestQuery["firstname"],
                $fetchRequestQuery["mail"],
                $fetchRequestQuery["ecole"],
                $fetchRequestQuery["role"],
                $fetchRequestQuery["where"]
            ];
        } else if ($sqlRequestType == "UPDATEPASSWORD") {
            $requiredKeys = ["mail", "password"];
            foreach ($requiredKeys as $key) {
                if (!isset($fetchRequestQuery[$key])) {
                    throw new \Exception("Missing key in request: $key");
                }
            }

            $sqlRequestMail = $fetchRequestQuery["mail"];
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['mail' => $sqlRequestMail]);

            if ($user) {
                $user->SetPassword(password_hash($fetchRequestQuery["password"], PASSWORD_DEFAULT));
            }

            $this->entityManager->flush();

            return new JsonResponse(['status' => 'success', 'message' => 'Data update']);
        }

        try {
            $this->executeSqlRequest($sqlRequest, $values);
            return new JsonResponse(['status' => 'success', 'message' => 'Data inserted']);
        } catch (Exception $e) {
            return new JsonResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    private function executeSqlRequest(string $sqlRequest, array $values): void
    {
        $statement = $this->entityManager->getConnection()->prepare($sqlRequest);
        $statement->execute($values);
    }

}