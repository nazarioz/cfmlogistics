'use client';
import { motion } from 'framer-motion';

export function RevealOnScroll({ children, direction = 'bottom', delay = 0 }) {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'bottom' ? 50 : direction === 'top' ? -50 : 0,
            x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
        >
            {children}
        </motion.div>
    );
}

export function StaggerChildren({ children, delay = 0.2 }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: delay
                    }
                },
                hidden: {
                    opacity: 1
                }
            }}
        >
            {children}
        </motion.div>
    );
}

export function FadeInScale({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay
                }
            }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {children}
        </motion.div>
    );
} 