<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class ExportJsonController extends AbstractController
{
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/export-json', name: 'export_json', methods: ['GET'])]
    public function exportJson(Request $request)
    {
        $fetchRequestQuery = $request->query->all();
        $sqlRequestMail = $fetchRequestQuery["mail"];

        if ($fetchRequestQuery["type"] == "LOGIN") {
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['mail' => $sqlRequestMail]);

            if ($user) {
                if (password_verify($fetchRequestQuery["password"], $user->getPassword())) {
                    $responseData = [
                        'mail' => $user->getMail(),
                    ];

                    return new JsonResponse($responseData);
                } else {
                    return new JsonResponse(['message' => 'Password does not match'], JsonResponse::HTTP_UNAUTHORIZED);
                }
            } else {
                return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
            }
        } else if ($fetchRequestQuery["type"] == "VERIFY") {
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['mail' => $sqlRequestMail]);

            if ($user) {
                if (password_verify($fetchRequestQuery["password"], $user->getPassword())) {
                    $responseData = [
                        true
                    ];
                } else {
                    $responseData = [
                        false
                    ];
                }
                return new JsonResponse($responseData);
            } else {
                return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
            }
        } else if ($fetchRequestQuery["type"] == "UPDATEUSER") {
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['mail' => $sqlRequestMail]);

            if ($user) {
                $responseData = [
                    'lastname' => $user->getLastname(),
                    'firstname' => $user->getFirstname(),
                    'ecole' => $user->getEcole(),
                    'role' => $user->getRole(),
                ];
                return new JsonResponse($responseData);
            } else {
                return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
            }
        }      
    }
}