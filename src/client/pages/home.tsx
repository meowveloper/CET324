
import { Button } from "@/src/client/components/ui/button";


export default function Home_Page() {
    return (
        <div className="container mx-auto p-8 text-center relative z-10">
            <div className="flex justify-center items-center gap-8 mb-8">
                Home Page
                <Button>Click me</Button>
            </div>
        </div>
    );
}

