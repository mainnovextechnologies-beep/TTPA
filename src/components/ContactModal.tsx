import { AnimatePresence, motion } from 'framer-motion'
import { X, Phone, MessageCircle } from 'lucide-react'
export default function ContactModal({ type, onClose }: { type: 'call' | 'whatsapp' | null; onClose: () => void }) {
  return <AnimatePresence>{type && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.div className="modal" initial={{ y: 18, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 12, scale: .97 }} onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18}/></button>
      <div className="modal-icon">{type === 'call' ? <Phone/> : <MessageCircle/>}</div>
      <span className="eyebrow">DEMO WEBSITE</span>
      <h3>{type === 'call' ? 'Calling is not active yet' : 'WhatsApp is not active yet'}</h3>
      <p>{type === 'call' ? 'This calling feature is currently available for demonstration purposes only. Actual calling functionality will be activated after official approval.' : 'WhatsApp communication is currently disabled in this demonstration version. This feature will be activated after official approval.'}</p>
      <button className="btn btn-primary modal-action" onClick={onClose}>Close</button>
    </motion.div>
  </motion.div>}</AnimatePresence>
}
