import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react'; 

export default function Footer() {
  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between h-20 gap-4">
          
          
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Next Store. All Rights Reserved.
          </p>
          
         
          <div className="flex items-center space-x-4">
            
            <Link href="https://github.com/rkmehedi" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://www.linkedin.com/in/astermehedi" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}