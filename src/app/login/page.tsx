import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { AuthLayout } from '@/app/_components/AuthLayout'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { motion, AnimatePresence } from 'framer-motion'
import { auth } from "@/server/auth"


