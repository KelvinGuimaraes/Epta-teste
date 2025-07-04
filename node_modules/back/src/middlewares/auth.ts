import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

// Adiciona a tipagem para req.user (caso precise depois)
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho Authorization existe
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não enviado' });
  }

  const [, token] = authHeader.split(' '); // Bearer <token>

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Salva os dados do usuário no req para usar nas rotas (opcional)
    req.user = decoded;

    return next(); // passa para a próxima função (ex: controller)
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}
