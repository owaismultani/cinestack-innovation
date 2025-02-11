import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface TruncatedTextProps {
    text: string;
    maxLength: number;
    className?: string;
}

export default function TruncatedText({text, maxLength, className}: TruncatedTextProps) {

    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpand = () => setIsExpanded(!isExpanded);
    const handleMouseLeave = () => setIsExpanded(false);


    return (
        <motion.div
        className={clsx("overflow-hidden", className)}
        initial={{height: "auto"}}
        animate={{height: isExpanded ? "auto" : '4.5rem'}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        onMouseLeave={handleMouseLeave}
        >
            <p>
                {isExpanded ? text : `${text.slice(0, maxLength)}...`}
                <Button className="p-1 text-primary-foreground" variant="link" onClick={toggleExpand}>
                    {isExpanded ? "Read less" : "Read more"}
                </Button>
            </p>

        </motion.div>
    );
}

