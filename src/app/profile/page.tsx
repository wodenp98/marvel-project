import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import UserInput from "@/components/UserInput/UserInput";

export default async function Page() {
  return (
    <main className="h-[80vh] flex flex-col items-center justify-center">
      <Card className="w-[350px] space-y-4">
        <CardHeader>
          <CardTitle>Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <UserInput />
        </CardContent>
        <CardFooter className="flex justify-center"></CardFooter>
      </Card>
    </main>
  );
}
