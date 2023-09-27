"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { UserIcon } from "lucide-react";

export default function MyInfoPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold leading-none">AJOU LIFE</p>
            <p className="text-xs leading-none">장우성아직여친구함</p>
          </div>
        </NavbarBrand>
      </Navbar>
      <div className="flex w-full flex-col gap-4 px-4">
        <Card>
          <CardBody>
            <User
              classNames={{
                base: "justify-start",
              }}
              name="손진혁"
              description="cuzz@ajou.ac.kr"
              avatarProps={{
                fallback: <UserIcon />,
              }}
            />
          </CardBody>
        </Card>
        <Card
          classNames={{
            base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
            body: "items-center",
          }}
          isPressable
          onPress={onOpen}
        >
          <CardBody>
            <div>
              <span>⭐ </span>
              <span
                className="animate-text bg-gradient-to-r from-green-500  via-emerald-500
            to-indigo-500 bg-clip-text font-bold
            text-transparent"
              >
                장우성
              </span>
              <span className="font-bold">의 </span>
              <span
                className="animate-text bg-gradient-to-r from-red-500  via-yellow-500
            to-orange-500 bg-clip-text font-bold
            text-transparent"
              >
                여자친구
              </span>
              <span className="font-bold"> 지원하기</span>
              <span> ⭐</span>
            </div>
          </CardBody>
        </Card>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  장우성의 여자친구 지원하기
                </ModalHeader>
                <ModalBody>
                  <Image src="/king.png" />
                  <p>장우성 (01년생, 23살)</p>
                  <p className="text-xs">
                    * 지원자의 정보는 장우성에게 전달되며, 지원자는 이를 거부할
                    권리가 있습니다. 거부 시에는 지원이 제한됩니다.
                    <br />
                    * 지원 시에는 장우성과의 만남 1회가 필수로 포함되며, 이후
                    장우성과 지원자의 자유로운 만남이 가능합니다.
                    <br />* 장우성과의 교제 성공 시 1회에 한하여 5만원의
                    지원금이 지급됩니다. 교제는 장우성의 여자친구로서의 만남을
                    의미하며, 교제 기간은 1달 이상 되어야 합니다. 교제 기간이
                    1달 미만일 경우, 지원금은 회수됩니다.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    아.. 생각좀..
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      alert("지원되었습니다. 연락을 기다려주세요.");
                      onClose();
                    }}
                  >
                    "가능"
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
