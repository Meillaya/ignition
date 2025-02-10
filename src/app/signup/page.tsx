"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/app/_components/ui/button'
import { Input } from '@/app/_components/ui/input'
import { useToast } from '@/app/_components/ui/use-toast'
import { AuthLayout } from '@/app/_components/AuthLayout'
import { RoleSelection } from '@/app/_components/RoleSelection'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Checkbox } from '@/app/_components/ui/checkbox'
import { motion, AnimatePresence } from 'framer-motion'
