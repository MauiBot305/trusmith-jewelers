'use client'

import { useState } from 'react'
import { X, Download, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  certNumber: string
  certLab: string
  certUrl?: string | null
}

export default function CertificateModal({
  isOpen,
  onClose,
  certNumber,
  certLab,
  certUrl,
}: CertificateModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 bg-black-soft border border-white/10 rounded-sm max-w-lg w-full p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-gold/80 text-xs uppercase tracking-[0.2em] mb-1">
            Certificate of Authenticity
          </p>
          <h2 className="font-serif text-2xl text-white">{certLab} Laboratory Report</h2>
        </div>

        {/* Cert info */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-white/60 text-sm">Laboratory</span>
            <span className="text-white font-medium">{certLab}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-white/60 text-sm">Report Number</span>
            <span className="text-white font-mono text-sm">{certNumber}</span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-white/60 text-sm">Diamond Type</span>
            <span className="text-white font-medium">Lab-Grown</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Status</span>
            <span className="text-green-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Verified Authentic
            </span>
          </div>
        </div>

        {/* Certificate preview placeholder */}
        <div className="bg-black border border-white/10 rounded-sm aspect-[8.5/11] mb-6 flex items-center justify-center">
          {certUrl ? (
            <iframe src={certUrl} className="w-full h-full" title="Certificate" />
          ) : (
            <div className="text-center text-white/30">
              <div className="w-16 h-16 mx-auto mb-3 border-2 border-white/20 rounded flex items-center justify-center">
                <span className="font-serif text-2xl text-gold/50">{certLab[0]}</span>
              </div>
              <p className="text-sm">Certificate Preview</p>
              <p className="text-xs mt-1">{certNumber}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {certUrl && (
            <a
              href={certUrl}
              download
              className="flex-1 flex items-center justify-center gap-2 border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 transition-all py-3 text-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          )}
          <a
            href={`https://www.igi.org/verify.php?r=${certNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gold-gradient text-black font-medium py-3 text-sm uppercase tracking-wider hover:shadow-gold transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Verify on {certLab}
          </a>
        </div>
      </div>
    </div>
  )
}
