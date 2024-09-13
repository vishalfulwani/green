// import { getServerSession } from "next-auth/next";
// import { ecommerceAuthOptions } from "../auth/ecommerce/[...nextauth]/options";
// import { foundationAuthOptions } from "../auth/foundation/[...nextauth]/options";
// // import { ecommerceAuthOptions } from "../auth/ecommerce/[...nextauth]/options";
// // import { foundationAuthOptions } from "../auth/foundation/[...nextauth]/options";
// // import { ecommerceAuthOptions, foundationAuthOptions } from "@/lib/auth"; 

// export async function POST(request: Request) {
//   const ecommerceSession = await getServerSession(ecommerceAuthOptions);
//   const foundationSession = await getServerSession(foundationAuthOptions);

//   if (ecommerceSession?.platform === "ecommerce") {
//     //   return Response.json({
//     //     success: true,
//     //     platform: "ecommerce",
//     //     user: ecommerceSession.user,
//     //   });
//       return Response.json({
//         success: true,
//         platform: "ecommerce",
//         user: ecommerceSession.user,
//       });
// } else if (foundationSession?.platform === "foundation") {
//     return Response.json({
//       success: true,
//       platform: "foundation",
//       user: foundationSession.user,
//     });
//   } else {
//     return Response.json({
//       success: false,
//       message: "Not authenticated",
//     }, { status: 401 });
//   }
// }
