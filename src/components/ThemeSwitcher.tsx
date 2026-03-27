import { useTheme } from "next-themes";
import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

const accents = [
    { name: "Purple", value: "purple", color: "bg-[#8b5cf6]" },
    { name: "Blue", value: "blue", color: "bg-[#3b82f6]" },
    { name: "Green", value: "green", color: "bg-[#22c55e]" },
    { name: "Orange", value: "orange", color: "bg-[#f59e0b]" },
];

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [accent, setAccent] = useState("purple");

    useEffect(() => {
        setMounted(true);
        const savedAccent = localStorage.getItem("portfolio-accent") || "purple";
        setAccent(savedAccent);
        document.documentElement.setAttribute("data-accent", savedAccent);
    }, []);

    const changeAccent = (val: string) => {
        setAccent(val);
        localStorage.setItem("portfolio-accent", val);
        document.documentElement.setAttribute("data-accent", val);
    };

    if (!mounted) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-white/5 border border-white/10">
                    <Palette className="h-4 w-4" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 glass-card border-white/10 p-2">
                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 py-1.5 font-mono-display">Theme Mode</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2 cursor-pointer">
                    <Sun className="h-4 w-4" /> <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2 cursor-pointer">
                    <Moon className="h-4 w-4" /> <span>Dark</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/5" />

                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 py-1.5 font-mono-display">Accent Color</DropdownMenuLabel>
                <div className="grid grid-cols-4 gap-2 p-2">
                    {accents.map((a) => (
                        <button
                            key={a.value}
                            onClick={() => changeAccent(a.value)}
                            className={`w-6 h-6 rounded-full ${a.color} transition-transform hover:scale-125 border-2 ${accent === a.value ? 'border-foreground' : 'border-transparent'}`}
                            title={a.name}
                        />
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
