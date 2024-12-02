// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { kakaoLogIn } from "../api";
// import { useToast } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router";

// export default function KakaoConfirm() {
//   const toast = useToast();
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { reset } = useForm();
  
//   const mutation = useMutation(kakaoLogIn, {
//     onSuccess: (data) => {
//       toast({
//         status: "success",
//         title: "Welcome!!!",
//         description: "Happy to have you back!!",
//         position: "bottom-right",
//       });
//       reset();
//       queryClient.refetchQueries(["me"]);
//       navigate("/");
//     },
//     onError: (error) => {
//       console.log("error");
//       toast({
//         status: "error",
//         title: "Login fail",
//         description: "Check your Kakao information",
//         position: "bottom-right",
//       });
//     },
//   });

//   // 카카오에서 받은 code로 로그인 확인 요청
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const code = params.get("code");
//   if (code) {
//     mutation.mutate(code);
//   }
// }
