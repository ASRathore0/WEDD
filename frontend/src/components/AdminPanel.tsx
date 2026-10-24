import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  LogOut,
  Sparkles,
  Users,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Heart,
  Plus,
  Trash2,
  Edit2,
  Download,
  Search,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Eye,
  EyeOff,
  Sliders,
  Check,
  Upload,
  Music,
  Volume2,
  Play,
  Pause,
  Disc,
} from 'lucide-react';
import { weddingApi } from '../services/api';
import type {
  InvitationData,
  WeddingEventData,
  StoryMilestoneData,
  GalleryMediaData,
  VenueTravelData,
  FamilyMember,
  SectionVisibility,
} from '../types/wedding';
import { DEFAULT_BRIDE_FAMILY } from './BrideFamilySection';

interface AdminPanelProps {
  onBackToGuestView: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToGuestView }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('universe_admin_token');
  });

  const [loginEmail, setLoginEmail] = useState<string>('admin@weddinguniverse.luxury');
  const [loginPassword, setLoginPassword] = useState<string>('universe2026');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'sections' | 'invitation' | 'bride_family' | 'events' | 'stories' | 'gallery' | 'venue' | 'rsvps'
  >('overview');

  const [savingSections, setSavingSections] = useState<boolean>(false);

  // Data States
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [invitationForm, setInvitationForm] = useState<Partial<InvitationData>>({});
  const [eventsList, setEventsList] = useState<WeddingEventData[]>([]);
  const [storiesList, setStoriesList] = useState<StoryMilestoneData[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryMediaData[]>([]);
  const [venueForm, setVenueForm] = useState<Partial<VenueTravelData>>({});
  const [rsvpsList, setRsvpsList] = useState<any[]>([]);
  const [rsvpSearch, setRsvpSearch] = useState<string>('');
  const [rsvpFilterStatus, setRsvpFilterStatus] = useState<string>('all');

  // Modals
  const [editingEvent, setEditingEvent] = useState<Partial<WeddingEventData> | null>(null);
  const [editingStory, setEditingStory] = useState<Partial<StoryMilestoneData> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryMediaData> | null>(null);
  const [editingFamilyMember, setEditingFamilyMember] = useState<Partial<FamilyMember> | null>(null);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState<boolean>(false);

  // Load Admin Data
  const loadAllData = async () => {
    try {
      const [dash, inv, evs, sts, gal, ven, rsv] = await Promise.all([
        weddingApi.getDashboard().catch(() => null),
        weddingApi.getAdminInvitation().catch(() => null),
        weddingApi.getAdminEvents().catch(() => ({ data: [] })),
        weddingApi.getAdminStories().catch(() => ({ data: [] })),
        weddingApi.getAdminGallery().catch(() => ({ data: [] })),
        weddingApi.getAdminVenue().catch(() => ({ data: {} })),
        weddingApi.getAdminRsvps().catch(() => ({ data: { data: [] } })),
      ]);

      if (dash?.success) setDashboardData(dash.data);
      if (inv?.success) setInvitationForm(inv.data);
      if (evs?.data) setEventsList(evs.data);
      if (sts?.data) setStoriesList(sts.data);
      if (gal?.data) setGalleryList(gal.data);
      if (ven?.data) setVenueForm(ven.data);
      if (rsv?.data?.data) setRsvpsList(rsv.data.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await weddingApi.login({ email: loginEmail, password: loginPassword });
      if (res?.success) {
        setIsAuthenticated(true);
        loadAllData();
      } else {
        setLoginError('Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setLoginError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await weddingApi.logout();
    setIsAuthenticated(false);
  };

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [isUploadingHero, setIsUploadingHero] = useState<boolean>(false);
  const [isUploadingGanesh, setIsUploadingGanesh] = useState<boolean>(false);
  const [isUploadingBride, setIsUploadingBride] = useState<boolean>(false);
  const [isUploadingGroom, setIsUploadingGroom] = useState<boolean>(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState<boolean>(false);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(false);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  // Helper updaters for Indian Wedding fields (Bride first, then Groom)
  const updateBrideField = (field: string, val: string) => {
    setInvitationForm((prev) => {
      const theme = { ...(prev.theme_settings || {}) };
      theme.bride_details = {
        name: prev.partner_one || 'Sweety Singh',
        qualification: 'M.Sc / MBA in Financial Management',
        profession: 'Financial Analyst & Creative Specialist',
        father_name: 'Shri Dharmendra Singh',
        mother_name: 'Smt. Sunita Devi',
        native_place: 'Thawe, Gopalganj, Bihar',
        about: '',
        photo_url: prev.hero_image_url || '/images/amit_sweety_hero.jpg',
        ...(theme.bride_details || {}),
        [field]: val,
      };
      return { ...prev, theme_settings: theme };
    });
  };

  const updateGroomField = (field: string, val: string) => {
    setInvitationForm((prev) => {
      const theme = { ...(prev.theme_settings || {}) };
      theme.groom_details = {
        name: prev.partner_two || 'Amit Kumar Singh',
        qualification: 'B.Tech in Computer Science / Senior Software Architect',
        profession: 'Senior Technology Consultant & Entrepreneur',
        father_name: 'Shri Ramendra Singh',
        mother_name: 'Smt. Shanti Devi',
        native_place: 'Thawe, Gopalganj, Bihar',
        about: '',
        photo_url: prev.hero_image_url || '/images/amit_sweety_hero.jpg',
        ...(theme.groom_details || {}),
        [field]: val,
      };
      return { ...prev, theme_settings: theme };
    });
  };

  const updateThemeField = (field: string, val: string) => {
    setInvitationForm((prev) => ({
      ...prev,
      theme_settings: {
        ...(prev.theme_settings || {}),
        [field]: val,
      },
    }));
  };

  // Save Invitation Form
  const handleSaveInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (heroFile) {
        const formData = new FormData();
        Object.entries(invitationForm).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (typeof value === 'object' && !(value instanceof File)) {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          }
        });
        formData.append('hero_image_file', heroFile);
        await weddingApi.updateAdminInvitation(formData);
      } else {
        await weddingApi.updateAdminInvitation(invitationForm);
      }
      showFeedback('success', 'Invitation settings and couple profiles updated successfully.');
      setHeroFile(null);
      loadAllData();
    } catch (err: any) {
      showFeedback('error', err.response?.data?.message || 'Failed to update invitation.');
    }
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingHero(true);
    try {
      const formData = new FormData();
      formData.append('hero_image_file', file);
      formData.append('title', invitationForm.title || 'Shubh Vivah');
      formData.append('partner_one', invitationForm.partner_one || 'Amit Kumar Singh');
      formData.append('partner_two', invitationForm.partner_two || 'Sweety Singh');
      formData.append(
        'wedding_date',
        invitationForm.wedding_date
          ? new Date(invitationForm.wedding_date).toISOString().slice(0, 19).replace('T', ' ')
          : '2026-11-30 19:00:00'
      );
      formData.append('wedding_timezone', invitationForm.wedding_timezone || 'Asia/Kolkata');
      formData.append('venue_city', invitationForm.venue_city || 'Shiv Bajrang Hotel, Thawe');
      formData.append('is_published', invitationForm.is_published ? '1' : '0');
      if (invitationForm.tagline) formData.append('tagline', invitationForm.tagline);
      if (invitationForm.theme_settings) {
        formData.append('theme_settings', JSON.stringify(invitationForm.theme_settings));
      }

      const res = await weddingApi.updateAdminInvitation(formData);
      if (res?.data?.hero_image_url) {
        setInvitationForm((prev) => ({ ...prev, hero_image_url: res.data.hero_image_url }));
        showFeedback('success', 'New hero portrait uploaded and applied live!');
      }
      loadAllData();
    } catch (err: any) {
      showFeedback('error', 'Failed to upload hero image.');
    } finally {
      setIsUploadingHero(false);
    }
  };

  const handleGaneshFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingGanesh(true);
    try {
      const formData = new FormData();
      formData.append('ganesh_image_file', file);
      formData.append('title', invitationForm.title || 'Shubh Vivah');
      formData.append('partner_one', invitationForm.partner_one || 'Amit Kumar Singh');
      formData.append('partner_two', invitationForm.partner_two || 'Sweety Singh');
      formData.append(
        'wedding_date',
        invitationForm.wedding_date
          ? new Date(invitationForm.wedding_date).toISOString().slice(0, 19).replace('T', ' ')
          : '2026-11-30 19:00:00'
      );
      formData.append('wedding_timezone', invitationForm.wedding_timezone || 'Asia/Kolkata');
      formData.append('venue_city', invitationForm.venue_city || 'Shiv Bajrang Hotel, Thawe');
      formData.append('is_published', invitationForm.is_published ? '1' : '0');
      if (invitationForm.theme_settings) {
        formData.append('theme_settings', JSON.stringify(invitationForm.theme_settings));
      }

      const res = await weddingApi.updateAdminInvitation(formData);
      if (res?.data?.theme_settings?.ganesh_image_url) {
        setInvitationForm((prev) => ({
          ...prev,
          theme_settings: res.data.theme_settings,
        }));
        showFeedback('success', 'Lord Ganesha sacred image updated!');
      }
      loadAllData();
    } catch (err: any) {
      showFeedback('error', 'Failed to upload Ganesha image.');
    } finally {
      setIsUploadingGanesh(false);
    }
  };

  const handleBrideFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBride(true);
    try {
      const formData = new FormData();
      formData.append('bride_image_file', file);
      formData.append('title', invitationForm.title || 'Shubh Vivah');
      formData.append('partner_one', invitationForm.partner_one || 'Sweety Singh');
      formData.append('partner_two', invitationForm.partner_two || 'Amit Kumar Singh');
      formData.append(
        'wedding_date',
        invitationForm.wedding_date
          ? new Date(invitationForm.wedding_date).toISOString().slice(0, 19).replace('T', ' ')
          : '2026-11-30 19:00:00'
      );
      formData.append('wedding_timezone', invitationForm.wedding_timezone || 'Asia/Kolkata');
      formData.append('venue_city', invitationForm.venue_city || 'Shiv Bajrang Hotel, Thawe');
      formData.append('is_published', invitationForm.is_published ? '1' : '0');
      if (invitationForm.tagline) formData.append('tagline', invitationForm.tagline);
      if (invitationForm.theme_settings) {
        formData.append('theme_settings', JSON.stringify(invitationForm.theme_settings));
      }

      const res = await weddingApi.updateAdminInvitation(formData);
      if (res?.data?.theme_settings?.bride_details?.photo_url) {
        setInvitationForm((prev) => ({
          ...prev,
          theme_settings: res.data.theme_settings,
        }));
        showFeedback('success', 'Bride photo uploaded and applied live!');
      }
      loadAllData();
    } catch (err: any) {
      showFeedback('error', 'Failed to upload Bride photo.');
    } finally {
      setIsUploadingBride(false);
    }
  };

  const handleGroomFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingGroom(true);
    try {
      const formData = new FormData();
      formData.append('groom_image_file', file);
      formData.append('title', invitationForm.title || 'Shubh Vivah');
      formData.append('partner_one', invitationForm.partner_one || 'Sweety Singh');
      formData.append('partner_two', invitationForm.partner_two || 'Amit Kumar Singh');
      formData.append(
        'wedding_date',
        invitationForm.wedding_date
          ? new Date(invitationForm.wedding_date).toISOString().slice(0, 19).replace('T', ' ')
          : '2026-11-30 19:00:00'
      );
      formData.append('wedding_timezone', invitationForm.wedding_timezone || 'Asia/Kolkata');
      formData.append('venue_city', invitationForm.venue_city || 'Shiv Bajrang Hotel, Thawe');
      formData.append('is_published', invitationForm.is_published ? '1' : '0');
      if (invitationForm.tagline) formData.append('tagline', invitationForm.tagline);
      if (invitationForm.theme_settings) {
        formData.append('theme_settings', JSON.stringify(invitationForm.theme_settings));
      }

      const res = await weddingApi.updateAdminInvitation(formData);
      if (res?.data?.theme_settings?.groom_details?.photo_url) {
        setInvitationForm((prev) => ({
          ...prev,
          theme_settings: res.data.theme_settings,
        }));
        showFeedback('success', 'Groom photo uploaded and applied live!');
      }
      loadAllData();
    } catch (err: any) {
      showFeedback('error', 'Failed to upload Groom photo.');
    } finally {
      setIsUploadingGroom(false);
    }
  };

  const handleAudioFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingAudio(true);
    try {
      const formData = new FormData();
      formData.append('audio_file', file);
      formData.append('title', invitationForm.title || 'Shubh Vivah');
      formData.append('partner_one', invitationForm.partner_one || 'Sweety Singh');
      formData.append('partner_two', invitationForm.partner_two || 'Amit Kumar Singh');
      formData.append(
        'wedding_date',
        invitationForm.wedding_date
          ? new Date(invitationForm.wedding_date).toISOString().slice(0, 19).replace('T', ' ')
          : '2026-11-30 19:00:00'
      );
      formData.append('wedding_timezone', invitationForm.wedding_timezone || 'Asia/Kolkata');
      formData.append('venue_city', invitationForm.venue_city || 'Shiv Bajrang Hotel, Thawe');
      formData.append('is_published', invitationForm.is_published ? '1' : '0');
      if (invitationForm.tagline) formData.append('tagline', invitationForm.tagline);
      const trackTitle = invitationForm.audio_title || file.name.replace(/\.[^/.]+$/, '');
      formData.append('audio_title', trackTitle);
      if (invitationForm.theme_settings) {
        formData.append('theme_settings', JSON.stringify(invitationForm.theme_settings));
      }

      const res = await weddingApi.updateAdminInvitation(formData);
      if (res?.data?.audio_url) {
        setInvitationForm((prev) => ({
          ...prev,
          audio_url: res.data.audio_url,
          audio_title: res.data.audio_title || trackTitle,
        }));
        showFeedback('success', 'New wedding soundtrack uploaded and applied live!');
      }
      loadAllData();
    } catch (err: any) {
      showFeedback('error', 'Failed to upload audio file. Ensure format is MP3/WAV/M4A/OGG.');
    } finally {
      setIsUploadingAudio(false);
    }
  };

  const togglePreviewAudio = () => {
    const audio = audioPreviewRef.current;
    if (!audio) return;
    if (isPreviewPlaying) {
      audio.pause();
      setIsPreviewPlaying(false);
    } else {
      audio.play().then(() => setIsPreviewPlaying(true)).catch(() => {
        showFeedback('error', 'Could not play audio. Check file format or URL.');
        setIsPreviewPlaying(false);
      });
    }
  };

  // Event Save & Delete
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    try {
      await weddingApi.saveAdminEvent(editingEvent);

      // If this event was a wedding/vivah ceremony, keep main wedding_date in sync
      if (
        (editingEvent.event_type === 'wedding' ||
          editingEvent.title?.toLowerCase().includes('vivah') ||
          editingEvent.title?.toLowerCase().includes('wedding')) &&
        editingEvent.event_date
      ) {
        const timePart = editingEvent.start_time ? ' 19:00:00' : ' 19:00:00';
        const syncedDate = `${editingEvent.event_date}${timePart}`;
        try {
          await weddingApi.updateAdminInvitation({
            ...invitationForm,
            wedding_date: syncedDate,
          });
          setInvitationForm((prev) => ({ ...prev, wedding_date: syncedDate }));
        } catch {
          // ignore sync error
        }
      }

      showFeedback('success', 'Ceremony date updated! Hero section & timeline refreshed live.');
      setEditingEvent(null);
      loadAllData();
    } catch (err: any) {
      showFeedback('error', 'Failed to save ceremony.');
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this ceremony?')) return;
    try {
      await weddingApi.deleteAdminEvent(id);
      showFeedback('success', 'Ceremony removed.');
      loadAllData();
    } catch (err) {
      showFeedback('error', 'Failed to delete ceremony.');
    }
  };

  // Story Save & Delete
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;

    try {
      await weddingApi.saveAdminStory(editingStory);
      showFeedback('success', 'Story milestone saved.');
      setEditingStory(null);
      loadAllData();
    } catch (err) {
      showFeedback('error', 'Failed to save story milestone.');
    }
  };

  const handleDeleteStory = async (id: number) => {
    if (!window.confirm('Delete this story milestone?')) return;
    try {
      await weddingApi.deleteAdminStory(id);
      showFeedback('success', 'Milestone removed.');
      loadAllData();
    } catch (err) {
      showFeedback('error', 'Failed to delete story.');
    }
  };

  // Gallery Save & Delete
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;

    try {
      await weddingApi.addAdminGallery(editingGallery);
      showFeedback('success', 'Media item added to gallery.');
      setEditingGallery(null);
      loadAllData();
    } catch (err: any) {
      showFeedback('error', err.response?.data?.message || 'Failed to add media item.');
    }
  };

  const handleDeleteGallery = async (id: number) => {
    if (!window.confirm('Delete this media item?')) return;
    try {
      await weddingApi.deleteAdminGallery(id);
      showFeedback('success', 'Media item removed.');
      loadAllData();
    } catch (err) {
      showFeedback('error', 'Failed to delete media item.');
    }
  };

  // Venue Save
  const handleSaveVenue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await weddingApi.updateAdminVenue(venueForm);
      showFeedback('success', 'Venue & travel logistics updated.');
      loadAllData();
    } catch (err: any) {
      showFeedback('error', 'Failed to update venue details.');
    }
  };

  // Bride Family Handlers
  const handleSaveFamilyMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFamilyMember?.name || !editingFamilyMember?.relation) {
      showFeedback('error', 'Name and Relation are required.');
      return;
    }

    const currentList: FamilyMember[] =
      invitationForm.theme_settings?.bride_family && invitationForm.theme_settings.bride_family.length > 0
        ? [...invitationForm.theme_settings.bride_family]
        : [...DEFAULT_BRIDE_FAMILY];

    const isExisting = currentList.some((m) => m.id === editingFamilyMember.id);
    let updatedList: FamilyMember[];

    if (isExisting) {
      updatedList = currentList.map((m) =>
        m.id === editingFamilyMember.id ? ({ ...m, ...editingFamilyMember } as FamilyMember) : m
      );
    } else {
      const newMember: FamilyMember = {
        id: editingFamilyMember.id || `bf-${Date.now()}`,
        name: editingFamilyMember.name,
        relation: editingFamilyMember.relation,
        category: editingFamilyMember.category || 'other',
        note: editingFamilyMember.note || '',
      };
      updatedList = [...currentList, newMember];
    }

    const newTheme = {
      ...(invitationForm.theme_settings || {}),
      bride_family: updatedList,
    };

    setInvitationForm((prev) => ({ ...prev, theme_settings: newTheme }));

    try {
      await weddingApi.updateAdminInvitation({
        ...invitationForm,
        theme_settings: newTheme,
      });
      showFeedback('success', 'Bride family member saved successfully.');
      setIsFamilyModalOpen(false);
      setEditingFamilyMember(null);
      loadAllData();
    } catch (err) {
      showFeedback('error', 'Failed to save bride family member.');
    }
  };

  const handleDeleteFamilyMember = async (id: string) => {
    if (!window.confirm('Delete this family member from Bride’s family list?')) return;
    const currentList: FamilyMember[] =
      invitationForm.theme_settings?.bride_family && invitationForm.theme_settings.bride_family.length > 0
        ? [...invitationForm.theme_settings.bride_family]
        : [...DEFAULT_BRIDE_FAMILY];

    const updatedList = currentList.filter((m) => m.id !== id);
    const newTheme = {
      ...(invitationForm.theme_settings || {}),
      bride_family: updatedList,
    };

    setInvitationForm((prev) => ({ ...prev, theme_settings: newTheme }));

    try {
      await weddingApi.updateAdminInvitation({
        ...invitationForm,
        theme_settings: newTheme,
      });
      showFeedback('success', 'Family member removed.');
      loadAllData();
    } catch (err) {
      showFeedback('error', 'Failed to remove family member.');
    }
  };

  const handleResetDefaultFamily = async () => {
    if (!window.confirm('Reset to default authentic family members for Singh Pariwar?')) return;
    const newTheme = {
      ...(invitationForm.theme_settings || {}),
      bride_family: DEFAULT_BRIDE_FAMILY,
    };

    setInvitationForm((prev) => ({ ...prev, theme_settings: newTheme }));

    try {
      await weddingApi.updateAdminInvitation({
        ...invitationForm,
        theme_settings: newTheme,
      });
      showFeedback('success', 'Bride family members reset to default.');
      loadAllData();
    } catch (err) {
      showFeedback('error', 'Failed to reset family list.');
    }
  };

  // RSVP Delete & CSV Export
  const handleDeleteRsvp = async (id: number) => {
    if (!window.confirm('Remove this RSVP record?')) return;
    try {
      await weddingApi.deleteAdminRsvp(id);
      showFeedback('success', 'RSVP record removed.');
      loadAllData();
    } catch (err) {
      showFeedback('error', 'Failed to delete RSVP.');
    }
  };

  const handleExportCsv = () => {
    window.open('/api/admin/rsvps-export', '_blank');
  };

  // Section Visibility Controls
  const getSectionStatus = (key: keyof SectionVisibility): boolean => {
    const vis = invitationForm.theme_settings?.section_visibility;
    if (!vis) return true;
    return vis[key] !== false;
  };

  const handleToggleSection = (key: keyof SectionVisibility) => {
    const currentStatus = getSectionStatus(key);
    const updatedStatus = !currentStatus;

    setInvitationForm((prev) => {
      const currentTheme = prev.theme_settings || {};
      const currentVis = currentTheme.section_visibility || {};
      return {
        ...prev,
        theme_settings: {
          ...currentTheme,
          section_visibility: {
            ...currentVis,
            [key]: updatedStatus,
          },
        },
      };
    });
  };

  const handleSaveSections = async (customVis?: SectionVisibility) => {
    setSavingSections(true);
    try {
      const visToSave = customVis || invitationForm.theme_settings?.section_visibility || {};
      const updatedTheme = {
        ...(invitationForm.theme_settings || {}),
        section_visibility: visToSave,
      };
      const payload = {
        ...invitationForm,
        theme_settings: updatedTheme,
      };

      await weddingApi.updateAdminInvitation(payload);
      setInvitationForm(payload);
      showFeedback('success', 'Section visibility settings saved successfully! (सेक्शन सेटिंग्स सुरक्षित हो गईं)');
      loadAllData();
    } catch (err: any) {
      showFeedback('error', err.response?.data?.message || 'Failed to save section visibility.');
    } finally {
      setSavingSections(false);
    }
  };

  const handleToggleAllSections = (enableAll: boolean) => {
    const newVis: SectionVisibility = {
      envelope_intro: enableAll,
      hero: enableAll,
      couple_profiles: enableAll,
      bride_family: enableAll,
      events: enableAll,
      venue_travel: enableAll,
      rsvp: enableAll,
      story: enableAll,
      gallery: enableAll,
      closing_scene: enableAll,
    };

    setInvitationForm((prev) => ({
      ...prev,
      theme_settings: {
        ...(prev.theme_settings || {}),
        section_visibility: newVis,
      },
    }));

    handleSaveSections(newVis);
  };

  const SECTION_CONTROLS: {
    key: keyof SectionVisibility;
    title: string;
    hindiTitle: string;
    category: string;
    description: string;
    hindiDesc: string;
    icon: any;
    navLabel: string;
  }[] = [
    {
      key: 'envelope_intro',
      title: '3D Opening Envelope & Wax Seal Intro',
      hindiTitle: 'शाही 3D लिफाफा एवं मुहर (Ganesh Ji Seal)',
      category: 'Welcome Screen (प्रवेश)',
      description: 'Interactive 3D opening envelope intro with auspicious Ganesh Ji golden wax seal before entering.',
      hindiDesc: 'वेबसाइट खुलते ही अतिथियों के स्वागत हेतु गणेश जी की शाही मुहर युक्त 3D लिफाफा। बंद करने पर सीधा मुख्य पेज दिखेगा।',
      icon: Sparkles,
      navLabel: 'Intro Screen',
    },
    {
      key: 'hero',
      title: 'Hero Banner & Muhurat Countdown',
      hindiTitle: 'मुख्य बैनर, गणेश वंदना एवं मुहूर्त टाइमर',
      category: 'Main Banner (शीर्ष भाग)',
      description: 'Lord Ganesha invocation shloka, couple portrait, wedding date announcement, and live countdown timer.',
      hindiDesc: 'श्री गणेशाय नमः श्लोक, वर-वधू का मुख्य शाही चित्र, विवाह तिथि और मुहूर्त का लाइव काउंटडाउन।',
      icon: Sparkles,
      navLabel: 'Top Header',
    },
    {
      key: 'couple_profiles',
      title: 'Bride & Groom Profiles (वधू - वर परिचय)',
      hindiTitle: 'वधू एवं वर विस्तृत परिचय व योग्यता (Bride First)',
      category: 'Couple Details (वर-वधू)',
      description: 'Detailed bios, qualifications, profession, individual photos, and gotra of Sweety (वधू) & Amit (वर).',
      hindiDesc: 'स्वीटी (वधू) एवं अमित (वर) का विस्तृत परिचय, शैक्षणिक योग्यता, कार्यक्षेत्र एवं व्यक्तिगत तस्वीरें।',
      icon: Users,
      navLabel: 'Bride & Groom',
    },
    {
      key: 'bride_family',
      title: "Bride's Family Members (वधू पक्ष परिवार)",
      hindiTitle: 'वधू पक्ष परिवार एवं दर्शनाभिलाषी (सिंह परिवार)',
      category: 'Singh Pariwar (परिवार)',
      description: 'Parents, grandparents, paternal & maternal uncles/aunts, and welcoming kinsfolk of Singh Pariwar.',
      hindiDesc: 'पूज्य माता-पिता, दादा-दादी, चाचा-चाची, मामा-मामी एवं समस्त दर्शनाभिलाषी स्वजनों की सूची।',
      icon: Heart,
      navLabel: "Bride's Family",
    },
    {
      key: 'events',
      title: 'Wedding Events & Ceremonies Timeline',
      hindiTitle: 'शुभ विवाह कार्यक्रम एवं मांगलिक तिथियां',
      category: 'Ceremonies (कार्यक्रम)',
      description: 'Chronological timeline of ceremonies (Tilak, Haldi, Mehendi, Sangeet, Vivah Sanskar, Vidai).',
      hindiDesc: 'तिलक, हल्दी, मेहंदी, संगीत, शुभ पाणिग्रहण संस्कार एवं विदाई के समय व स्थान का विवरण।',
      icon: Calendar,
      navLabel: 'Ceremonies',
    },
    {
      key: 'venue_travel',
      title: 'Venue, Map & Travel Logistics',
      hindiTitle: 'विवाह स्थल एवं मार्ग दर्शन (Google Maps)',
      category: 'Venue & Directions (स्थान)',
      description: 'Palace / banquet hall details, address, Google Maps directions, and travel instructions for guests.',
      hindiDesc: 'विवाह स्थल का नाम, पता, गूगल मैप्स दिशा-निर्देश एवं अतिथियों के लिए आवागमन की जानकारी।',
      icon: MapPin,
      navLabel: 'Venue & Travel',
    },
    {
      key: 'rsvp',
      title: 'RSVP & Guest Blessings Form',
      hindiTitle: 'शुभकामनाएं एवं उपस्थिति (RSVP)',
      category: 'Guest Interaction (अतिथि)',
      description: 'Digital RSVP form allowing guests to confirm their attendance and submit heartfelt wishes & blessings.',
      hindiDesc: 'अतिथियों द्वारा अपनी उपस्थिति दर्ज करने एवं वर-वधू को स्नेहिल आशीर्वाद/शुभकामनाएं भेजने का फॉर्म।',
      icon: Heart,
      navLabel: 'Send Blessings',
    },
    {
      key: 'story',
      title: 'Couple Love Story & Milestones',
      hindiTitle: 'हमारी प्रेम कथा (Love Story Milestones)',
      category: 'Memories (स्मृतियां)',
      description: 'Romantic journey, how the couple met, the proposal, and meaningful milestones of their love story.',
      hindiDesc: 'वर-वधू की पहली मुलाकात, परिणय सूत्र का प्रस्ताव और खूबसूरत स्मृतियों की प्रेम यात्रा।',
      icon: Heart,
      navLabel: 'Our Story',
    },
    {
      key: 'gallery',
      title: 'Royal Photo Gallery',
      hindiTitle: 'शाही फोटो गैलरी (Pre-Wedding & Memories)',
      category: 'Memories & Photos (गैलरी)',
      description: 'Cinematic royal gallery showcasing pre-wedding shoots, engagement ceremonies, and celebration photos.',
      hindiDesc: 'प्री-वेडिंग शूट, सगाई एवं यादगार लम्हों की भव्य शाही फोटो गैलरी।',
      icon: ImageIcon,
      navLabel: 'Royal Gallery',
    },
    {
      key: 'closing_scene',
      title: 'Auspicious Blessings & Farewell (पावन समापन)',
      hindiTitle: 'पावन समापन, मंगलाचरण एवं शुभाशीष',
      category: 'Closing (समापन)',
      description: 'Final traditional blessings, invitation replay button, and copyright/credits.',
      hindiDesc: 'अंतिम मंगल श्लोक, लिफाफे को पुनः देखने का विकल्प एवं सस्नेह विदाई संदेश।',
      icon: Sparkles,
      navLabel: 'Closing Scene',
    },
  ];

  // Filtered RSVPs
  const filteredRsvps = rsvpsList.filter((item) => {
    const matchesSearch =
      !rsvpSearch ||
      item.guest_name?.toLowerCase().includes(rsvpSearch.toLowerCase()) ||
      item.email?.toLowerCase().includes(rsvpSearch.toLowerCase());
    const matchesStatus =
      rsvpFilterStatus === 'all' || item.attendance_status === rsvpFilterStatus;
    return matchesSearch && matchesStatus;
  });

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#100C12] text-[#F5ECDD] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl border border-[#D7B46A]/40 bg-gradient-to-b from-[#1C101F] to-[#120A14] shadow-2xl backdrop-blur-xl"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#651B2B]/40 border border-[#D7B46A] flex items-center justify-center text-[#D7B46A] shadow-[0_0_20px_rgba(215,180,106,0.3)]">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="font-title text-2xl font-semibold gold-text-gradient">
              Celestial Sanctum
            </h2>
            <p className="text-xs text-[#F5ECDD]/70 font-editorial italic mt-1">
              Protected Administrator Portal
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-[#651B2B]/40 border border-[#E34236] text-xs text-[#F5ECDD] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#E34236] shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#140C17] border border-[#D7B46A]/30 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#140C17] border border-[#D7B46A]/30 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-semibold tracking-widest uppercase border border-[#D7B46A]/50 shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {loginLoading ? <Loader2 className="w-4 h-4 animate-spin text-[#D7B46A]" /> : null}
                <span>Authenticate & Enter</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-[#F5ECDD]/50">
            <div>Default Administrator Credentials:</div>
            <div className="font-mono text-[#D7B46A] mt-1">
              admin@weddinguniverse.luxury / universe2026
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onBackToGuestView}
              className="text-xs text-[#F5ECDD]/60 hover:text-[#D7B46A] transition-colors cursor-pointer"
            >
              ← Back to Guest Invitation Experience
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#100C12] text-[#F5ECDD] pb-20">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#160D19]/90 border-b border-[#D7B46A]/30 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#651B2B] border border-[#D7B46A] flex items-center justify-center text-[#D7B46A]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-title text-base sm:text-lg text-[#F3E5AB] tracking-wide">
              Wedding Universe Admin
            </h1>
            <div className="text-[10px] text-[#D7B46A] font-mono uppercase tracking-widest">
              Live Palatial Control Room
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGuestView}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A0E1A] border border-[#D7B46A]/40 text-[#D7B46A] hover:bg-[#651B2B] text-xs font-medium transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Guest Invitation</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#651B2B]/40 hover:bg-[#651B2B] border border-[#E34236]/40 text-[#F5ECDD] text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-[#E34236]" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Global Feedback Alert */}
      {feedbackMessage && (
        <div
          className={`fixed top-16 right-4 z-50 p-4 rounded-xl border shadow-2xl text-xs flex items-center gap-3 ${
            feedbackMessage.type === 'success'
              ? 'bg-[#18361E]/95 border-emerald-500 text-emerald-200'
              : 'bg-[#40121C]/95 border-rose-500 text-rose-200'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-3 mb-8 border-b border-white/10 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: Sparkles },
            { id: 'sections', label: 'Section On/Off (कंट्रोल)', icon: Sliders },
            { id: 'invitation', label: 'Invitation Details', icon: Heart },
            { id: 'bride_family', label: "Bride's Family (वधू पक्ष)", icon: Users },
            { id: 'events', label: 'Ceremonies', icon: Calendar },
            { id: 'stories', label: 'Story Milestones', icon: Users },
            { id: 'gallery', label: 'Gallery Media', icon: ImageIcon },
            { id: 'venue', label: 'Venue & Travel', icon: MapPin },
            { id: 'rsvps', label: 'RSVP Guest List', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] border border-[#D7B46A]/50 shadow-md'
                    : 'bg-[#180E1C]/60 text-[#F5ECDD]/60 hover:text-[#D7B46A] border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#1A0E1A] border border-[#D7B46A]/30 backdrop-blur-md">
                <div className="text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-mono">
                  Total RSVPs
                </div>
                <div className="font-title text-3xl font-semibold text-[#F3E5AB]">
                  {dashboardData?.stats?.total_rsvps ?? rsvpsList.length}
                </div>
                <div className="text-[11px] text-[#F5ECDD]/60 mt-1">
                  Responses received
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1A0E1A] border border-emerald-500/30 backdrop-blur-md">
                <div className="text-[11px] uppercase tracking-wider text-emerald-400 mb-1 font-mono">
                  Attending Guests
                </div>
                <div className="font-title text-3xl font-semibold text-emerald-300">
                  {dashboardData?.stats?.total_attending_guests ??
                    rsvpsList
                      .filter((r) => r.attendance_status === 'attending')
                      .reduce((acc, curr) => acc + (curr.guest_count || 1), 0)}
                </div>
                <div className="text-[11px] text-emerald-400/70 mt-1">
                  Confirmed attendees
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1A0E1A] border border-[#D7B46A]/30 backdrop-blur-md">
                <div className="text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-mono">
                  Ceremonies
                </div>
                <div className="font-title text-3xl font-semibold text-[#F3E5AB]">
                  {eventsList.length}
                </div>
                <div className="text-[11px] text-[#F5ECDD]/60 mt-1">
                  Scheduled events
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1A0E1A] border border-[#D7B46A]/30 backdrop-blur-md">
                <div className="text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-mono">
                  Gallery Photos
                </div>
                <div className="font-title text-3xl font-semibold text-[#F3E5AB]">
                  {galleryList.length}
                </div>
                <div className="text-[11px] text-[#F5ECDD]/60 mt-1">
                  High-res memories
                </div>
              </div>
            </div>

            {/* Quick Status Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#200D1C] to-[#140815] border border-[#D7B46A]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-title text-xl text-[#F3E5AB]">
                  {invitationForm.partner_one} & {invitationForm.partner_two}
                </h3>
                <p className="text-xs text-[#F5ECDD]/80 font-editorial italic mt-1">
                  {invitationForm.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${
                    invitationForm.is_published
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {invitationForm.is_published ? '● Published Live' : '○ Private Draft'}
                </span>

                <button
                  onClick={onBackToGuestView}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-medium tracking-wider uppercase border border-[#D7B46A]/40 cursor-pointer shadow-md"
                >
                  Preview Invitation →
                </button>
              </div>
            </div>

            {/* Recent RSVPs Table in Overview */}
            <div className="rounded-2xl border border-[#D7B46A]/30 bg-[#160D19] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-title text-lg text-[#F5ECDD]">Recent RSVP Submissions</h3>
                <button
                  onClick={() => setActiveTab('rsvps')}
                  className="text-xs text-[#D7B46A] hover:underline"
                >
                  View All ({rsvpsList.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-[#D7B46A] font-mono uppercase tracking-wider">
                      <th className="py-2.5 px-3">Guest Name</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Party Size</th>
                      <th className="py-2.5 px-3">Contact</th>
                      <th className="py-2.5 px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {rsvpsList.slice(0, 5).map((r, i) => (
                      <tr key={r.id || i} className="hover:bg-white/5">
                        <td className="py-3 px-3 font-medium text-[#F5ECDD]">{r.guest_name}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                              r.attendance_status === 'attending'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : r.attendance_status === 'declined'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {r.attendance_status}
                          </span>
                        </td>
                        <td className="py-3 px-3">{r.guest_count} guest(s)</td>
                        <td className="py-3 px-3 text-[#F5ECDD]/70">{r.email || r.phone || '—'}</td>
                        <td className="py-3 px-3 text-[#F5ECDD]/70 truncate max-w-xs">{r.message || r.dietary_notes || '—'}</td>
                      </tr>
                    ))}
                    {rsvpsList.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-[#F5ECDD]/50">
                          No RSVP submissions recorded yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB: SECTION VISIBILITY CONTROLS (ON / OFF) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'sections' && (
          <div className="space-y-6 max-w-5xl">
            {/* Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#220E24] via-[#1A0B1C] to-[#120714] border border-[#D7B46A]/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full bg-[#D7B46A]/20 border border-[#D7B46A]/50 text-[#F3E5AB] font-mono text-[10px] tracking-widest uppercase">
                    Live Section Switchboard
                  </span>
                  <span className="text-xs text-[#D7B46A]">卐</span>
                </div>
                <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
                  Section Visibility Controls (सेक्शन ऑन/ऑफ)
                </h2>
                <p className="text-xs sm:text-sm text-[#F5ECDD]/80 mt-1 max-w-2xl leading-relaxed font-body">
                  Toggle on or off every individual section of the wedding invitation in real time.
                  When any section is turned <strong className="text-rose-400">OFF</strong>, both its content and its navigation link in the top bar and mobile drawer will be automatically hidden from guests.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleToggleAllSections(true)}
                  disabled={savingSections}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  title="Turn all 10 sections ON"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Turn All ON (सभी चालू)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleAllSections(false)}
                  disabled={savingSections}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/50 text-rose-300 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  title="Turn all 10 sections OFF"
                >
                  <EyeOff className="w-4 h-4 text-rose-400" />
                  <span>Turn All OFF (सभी बंद)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveSections()}
                  disabled={savingSections}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D7B46A] via-[#E5C378] to-[#CA9D48] text-[#331800] text-xs font-bold tracking-wider uppercase shadow-[0_4px_20px_rgba(215,180,106,0.35)] hover:shadow-[0_6px_25px_rgba(215,180,106,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {savingSections ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#331800]" />
                  ) : (
                    <Check className="w-4 h-4 text-[#331800]" />
                  )}
                  <span>Save Changes (सुरक्षित करें)</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Bar */}
            <div className="flex items-center justify-between px-2 text-xs text-[#F5ECDD]/70">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#D7B46A]" />
                <span>Showing all 10 modular sections:</span>
              </div>
              <div className="font-mono text-[#D7B46A] font-bold">
                {SECTION_CONTROLS.filter((s) => getSectionStatus(s.key)).length} of 10 Active
              </div>
            </div>

            {/* Section Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SECTION_CONTROLS.map((sec, idx) => {
                const Icon = sec.icon;
                const isEnabled = getSectionStatus(sec.key);

                return (
                  <div
                    key={sec.key}
                    onClick={() => handleToggleSection(sec.key)}
                    className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                      isEnabled
                        ? 'bg-gradient-to-br from-[#1C0F1E] to-[#140A16] border-[#D7B46A]/50 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#D7B46A]'
                        : 'bg-[#120814]/70 border-white/10 opacity-70 hover:opacity-90'
                    }`}
                  >
                    <div>
                      {/* Top Row: Category + Index + Live Badge + Switch */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-[#D7B46A] px-2 py-0.5 rounded-md bg-[#2D162B] border border-[#D7B46A]/30">
                            #{idx + 1}
                          </span>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#F5ECDD]/60">
                            {sec.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Live Status Pill */}
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                              isEnabled
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-zinc-800/80 text-zinc-400 border-zinc-700'
                            }`}
                          >
                            {isEnabled ? '● Active (चालू)' : '○ Hidden (बंद)'}
                          </span>

                          {/* Custom Animated Toggle Switch */}
                          <div
                            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                              isEnabled
                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 justify-end'
                                : 'bg-zinc-800 justify-start'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                                isEnabled ? 'scale-110' : 'scale-90'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Title & Icon */}
                      <div className="flex items-start gap-3 mt-1">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                            isEnabled
                              ? 'bg-[#651B2B]/40 border-[#D7B46A] text-[#D7B46A]'
                              : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-title text-base sm:text-lg font-semibold leading-snug ${
                              isEnabled ? 'text-[#F3E5AB]' : 'text-[#F5ECDD]/60'
                            }`}
                          >
                            {sec.title}
                          </h3>
                          <div className="text-xs text-[#D7B46A] font-hindi font-medium mt-0.5">
                            {sec.hindiTitle}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#F5ECDD]/75 mt-3 leading-relaxed font-body">
                        {sec.description}
                      </p>
                      <p className="text-[11px] text-[#F5ECDD]/50 mt-1 font-hindi leading-relaxed">
                        {sec.hindiDesc}
                      </p>
                    </div>

                    {/* Footer Row: Nav link indicator */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-[#F5ECDD]/50">
                        Header & Drawer Link:
                      </span>
                      <span
                        className={`font-mono text-xs ${
                          isEnabled ? 'text-[#D7B46A]' : 'text-zinc-500 line-through'
                        }`}
                      >
                        {sec.navLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Save Bar */}
            <div className="p-5 rounded-2xl bg-[#170C18] border border-[#D7B46A]/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#651B2B]/50 border border-[#D7B46A]/50 flex items-center justify-center text-[#D7B46A]">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#F3E5AB]">
                    Instant Real-Time Section Visibility
                  </div>
                  <div className="text-[11px] text-[#F5ECDD]/60">
                    Click "Save Visibility Settings" to immediately apply your chosen configuration to the live wedding website.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onBackToGuestView}
                  className="px-4 py-2.5 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 text-xs text-[#F5ECDD] transition-colors cursor-pointer"
                >
                  Preview Website
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveSections()}
                  disabled={savingSections}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#651B2B] via-[#E34236] to-[#651B2B] text-[#F5ECDD] text-xs font-bold tracking-wider uppercase border border-[#D7B46A]/60 shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {savingSections ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#D7B46A]" />
                  ) : (
                    <Check className="w-4 h-4 text-[#D7B46A]" />
                  )}
                  <span>Save Visibility Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: INVITATION DETAILS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'invitation' && (
          <form
            onSubmit={handleSaveInvitation}
            className="p-6 sm:p-8 rounded-2xl border border-[#D7B46A]/30 bg-[#160D19] shadow-xl space-y-6 max-w-4xl"
          >
            <div>
              <h3 className="font-title text-xl text-[#F3E5AB]">Invitation Configuration</h3>
              <p className="text-xs text-[#F5ECDD]/60 font-body mt-1">
                Configure couple names, wedding date & timezone countdown, hero picture, audio soundtrack, and publish status.
              </p>
            </div>

            {/* HERO SECTION ROYAL PORTRAIT EDITOR */}
            <div className="p-5 rounded-2xl border border-[#D7B46A]/40 bg-gradient-to-r from-[#1E0F20] to-[#140A16] shadow-lg">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Visual Preview */}
                <div className="relative shrink-0 mx-auto md:mx-0">
                  <div className="w-36 h-48 sm:w-44 sm:h-60 rounded-t-[70px] rounded-b-xl overflow-hidden border-2 border-[#D7B46A] shadow-xl bg-black">
                    <img
                      src={invitationForm.hero_image_url || '/images/amit_sweety_hero.jpg'}
                      alt="Hero Section Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/80 text-[10px] text-[#F3E5AB] font-mono whitespace-nowrap border border-[#D7B46A]/40">
                    Active Hero Photo
                  </span>
                </div>

                {/* Controls */}
                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7B46A] block">
                      Featured Hero Picture
                    </span>
                    <h4 className="font-title text-base sm:text-lg text-[#F5ECDD]">
                      Hero Section Royal Portrait
                    </h4>
                    <p className="text-xs text-[#F5ECDD]/70 font-body">
                      This portrait is framed as the grand centerpiece of the Hero scene under the celestial moon. It is fully editable from here.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                      Image URL or Public Path
                    </label>
                    <input
                      type="text"
                      placeholder="/images/amit_sweety_hero.jpg or https://..."
                      value={invitationForm.hero_image_url || ''}
                      onChange={(e) => setInvitationForm({ ...invitationForm, hero_image_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#651B2B]/40 hover:bg-[#651B2B] border border-[#D7B46A]/40 text-[#F3E5AB] text-xs font-medium cursor-pointer transition-colors">
                      {isUploadingHero ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D7B46A]" /> : <ImageIcon className="w-3.5 h-3.5" />}
                      <span>{isUploadingHero ? 'Uploading...' : 'Upload New Photo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroFileUpload}
                        className="sr-only"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setInvitationForm({ ...invitationForm, hero_image_url: '/images/amit_sweety_hero.jpg' })}
                      className="text-xs text-[#D7B46A] hover:underline cursor-pointer"
                    >
                      Reset to Amit & Sweety Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* LORD GANESHA AUSPICIOUS INVOCATION EDITOR */}
            <div className="p-5 rounded-2xl border border-[#D7B46A]/40 bg-gradient-to-r from-[#200A16] to-[#160710] shadow-lg">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#D7B46A] shadow-xl bg-black p-0.5">
                    <img
                      src={invitationForm.theme_settings?.ganesh_image_url || '/images/ganesh_ji.jpg'}
                      alt="Lord Ganesha Emblem"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="block text-center mt-1 text-[10px] text-[#F3E5AB] font-mono">
                    गणेश जी
                  </span>
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7B46A] block">
                      Auspicious Blessing Header
                    </span>
                    <h4 className="font-title text-base sm:text-lg text-[#F5ECDD]">
                      Lord Ganesha Invocation & Shloka
                    </h4>
                    <p className="text-xs text-[#F5ECDD]/70">
                      Traditional Indian wedding blessing displayed at the top of the invitation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                        Shloka Title (Hindi / Sanskrit)
                      </label>
                      <input
                        type="text"
                        value={invitationForm.theme_settings?.ganesh_shloka_hindi || '॥ श्री गणेशाय नमः ॥'}
                        onChange={(e) => updateThemeField('ganesh_shloka_hindi', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                        Ganesha Image URL
                      </label>
                      <input
                        type="text"
                        value={invitationForm.theme_settings?.ganesh_image_url || '/images/ganesh_ji.jpg'}
                        onChange={(e) => updateThemeField('ganesh_image_url', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                      Sacred Mantra / Shloka Body
                    </label>
                    <input
                      type="text"
                      value={invitationForm.theme_settings?.ganesh_mantra || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'}
                      onChange={(e) => updateThemeField('ganesh_mantra', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#651B2B]/40 hover:bg-[#651B2B] border border-[#D7B46A]/40 text-[#F3E5AB] text-xs font-medium cursor-pointer transition-colors">
                      {isUploadingGanesh ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D7B46A]" /> : <ImageIcon className="w-3.5 h-3.5" />}
                      <span>{isUploadingGanesh ? 'Uploading...' : 'Upload New Ganesha Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGaneshFileUpload}
                        className="sr-only"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => updateThemeField('ganesh_image_url', '/images/ganesh_ji.jpg')}
                      className="text-xs text-[#D7B46A] hover:underline cursor-pointer"
                    >
                      Reset to Default Golden Ganesha
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BRIDE DETAILS & QUALIFICATIONS (वधू परिचय) - FIRST */}
            <div className="p-5 rounded-2xl border border-[#D7B46A]/40 bg-gradient-to-r from-[#200A16] to-[#160710] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#D7B46A]/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7B46A] block">
                    Meet the Couple Profile
                  </span>
                  <h4 className="font-title text-lg text-[#F3E5AB] flex items-center gap-2">
                    <span>वधू परिचय — Bride Details & Qualifications</span>
                  </h4>
                </div>
                <span className="px-3 py-0.5 rounded-full bg-[#3D0B14] border border-[#D7B46A]/50 text-[11px] text-[#F3E5AB]">
                  Bride (वधू)
                </span>
              </div>

              {/* Bride Photo Upload & Live Preview */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#D7B46A] shadow-md bg-[#200A16] shrink-0 p-0.5">
                  <img
                    src={invitationForm.theme_settings?.bride_details?.photo_url || invitationForm.hero_image_url || '/images/amit_sweety_hero.jpg'}
                    alt="Bride Preview"
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                </div>
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#D7B46A] font-bold">
                      Bride Profile Picture (वधू का फोटो)
                    </label>
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D7B46A] to-[#B89648] text-[#1D060A] text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-sm">
                      {isUploadingBride ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploadingBride}
                        onChange={handleBrideFileUpload}
                      />
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Or paste image URL (e.g. /images/... or https://...)"
                      value={invitationForm.theme_settings?.bride_details?.photo_url || ''}
                      onChange={(e) => updateBrideField('photo_url', e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#1A0E1C] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                    />
                    {invitationForm.theme_settings?.bride_details?.photo_url && (
                      <button
                        type="button"
                        onClick={() => updateBrideField('photo_url', '')}
                        className="px-2.5 py-1.5 rounded-lg bg-[#3D0B14] text-[#F3E5AB] text-xs hover:bg-[#52101B] border border-[#D7B46A]/30 transition-all cursor-pointer"
                        title="Reset to default hero picture"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Bride Full Name
                  </label>
                  <input
                    type="text"
                    value={invitationForm.theme_settings?.bride_details?.name || invitationForm.partner_one || 'Sweety Singh'}
                    onChange={(e) => {
                      updateBrideField('name', e.target.value);
                      setInvitationForm((prev) => ({ ...prev, partner_one: e.target.value }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Education & Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. M.Sc / MBA in Financial Management"
                    value={invitationForm.theme_settings?.bride_details?.qualification || ''}
                    onChange={(e) => updateBrideField('qualification', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Profession & Career
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Financial Analyst & Creative Specialist"
                    value={invitationForm.theme_settings?.bride_details?.profession || ''}
                    onChange={(e) => updateBrideField('profession', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Shri ..."
                    value={invitationForm.theme_settings?.bride_details?.father_name || ''}
                    onChange={(e) => updateBrideField('father_name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Smt. ..."
                    value={invitationForm.theme_settings?.bride_details?.mother_name || ''}
                    onChange={(e) => updateBrideField('mother_name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Native Place & Roots
                  </label>
                  <input
                    type="text"
                    placeholder="Thawe, Gopalganj, Bihar"
                    value={invitationForm.theme_settings?.bride_details?.native_place || ''}
                    onChange={(e) => updateBrideField('native_place', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                  About Bride (Bio / Virtues)
                </label>
                <textarea
                  rows={2}
                  placeholder="Short bio or qualities of the bride..."
                  value={invitationForm.theme_settings?.bride_details?.about || ''}
                  onChange={(e) => updateBrideField('about', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A] resize-none"
                />
              </div>
            </div>

            {/* GROOM DETAILS & QUALIFICATIONS (वर परिचय) - SECOND */}
            <div className="p-5 rounded-2xl border border-[#D7B46A]/40 bg-gradient-to-r from-[#200A16] to-[#160710] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#D7B46A]/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7B46A] block">
                    Meet the Couple Profile
                  </span>
                  <h4 className="font-title text-lg text-[#F3E5AB] flex items-center gap-2">
                    <span>वर परिचय — Groom Details & Qualifications</span>
                  </h4>
                </div>
                <span className="px-3 py-0.5 rounded-full bg-[#3D0B14] border border-[#D7B46A]/50 text-[11px] text-[#F3E5AB]">
                  Groom (वर)
                </span>
              </div>

              {/* Groom Photo Upload & Live Preview */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#D7B46A] shadow-md bg-[#200A16] shrink-0 p-0.5">
                  <img
                    src={invitationForm.theme_settings?.groom_details?.photo_url || invitationForm.hero_image_url || '/images/amit_sweety_hero.jpg'}
                    alt="Groom Preview"
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                </div>
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-[11px] uppercase tracking-wider text-[#D7B46A] font-bold">
                      Groom Profile Picture (वर का फोटो)
                    </label>
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D7B46A] to-[#B89648] text-[#1D060A] text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-sm">
                      {isUploadingGroom ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploadingGroom}
                        onChange={handleGroomFileUpload}
                      />
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Or paste image URL (e.g. /images/... or https://...)"
                      value={invitationForm.theme_settings?.groom_details?.photo_url || ''}
                      onChange={(e) => updateGroomField('photo_url', e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#1A0E1C] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                    />
                    {invitationForm.theme_settings?.groom_details?.photo_url && (
                      <button
                        type="button"
                        onClick={() => updateGroomField('photo_url', '')}
                        className="px-2.5 py-1.5 rounded-lg bg-[#3D0B14] text-[#F3E5AB] text-xs hover:bg-[#52101B] border border-[#D7B46A]/30 transition-all cursor-pointer"
                        title="Reset to default hero picture"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Groom Full Name
                  </label>
                  <input
                    type="text"
                    value={invitationForm.theme_settings?.groom_details?.name || invitationForm.partner_two || 'Amit Kumar Singh'}
                    onChange={(e) => {
                      updateGroomField('name', e.target.value);
                      setInvitationForm((prev) => ({ ...prev, partner_two: e.target.value }));
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Education & Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech in CS / Senior Software Architect"
                    value={invitationForm.theme_settings?.groom_details?.qualification || ''}
                    onChange={(e) => updateGroomField('qualification', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Profession & Career
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Technology Consultant & Entrepreneur"
                    value={invitationForm.theme_settings?.groom_details?.profession || ''}
                    onChange={(e) => updateGroomField('profession', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Shri ..."
                    value={invitationForm.theme_settings?.groom_details?.father_name || ''}
                    onChange={(e) => updateGroomField('father_name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Smt. ..."
                    value={invitationForm.theme_settings?.groom_details?.mother_name || ''}
                    onChange={(e) => updateGroomField('mother_name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                    Native Place & Roots
                  </label>
                  <input
                    type="text"
                    placeholder="Thawe, Gopalganj, Bihar"
                    value={invitationForm.theme_settings?.groom_details?.native_place || ''}
                    onChange={(e) => updateGroomField('native_place', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                  About Groom (Bio / Values)
                </label>
                <textarea
                  rows={2}
                  placeholder="Short bio or virtues of the groom..."
                  value={invitationForm.theme_settings?.groom_details?.about || ''}
                  onChange={(e) => updateGroomField('about', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A] resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Bride Full Name (वधू)
                </label>
                <input
                  type="text"
                  required
                  value={invitationForm.partner_one || ''}
                  onChange={(e) => setInvitationForm({ ...invitationForm, partner_one: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Groom Full Name (वर)
                </label>
                <input
                  type="text"
                  required
                  value={invitationForm.partner_two || ''}
                  onChange={(e) => setInvitationForm({ ...invitationForm, partner_two: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Main Wedding Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={
                    invitationForm.wedding_date
                      ? invitationForm.wedding_date.replace(' ', 'T').slice(0, 16)
                      : '2026-11-30T19:00'
                  }
                  onChange={(e) => {
                    const raw = e.target.value;
                    const val = raw ? raw.replace('T', ' ') + (raw.length === 16 ? ':00' : '') : '';
                    setInvitationForm({ ...invitationForm, wedding_date: val });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A]"
                />
                <span className="text-[10px] text-[#F5ECDD]/60 mt-1 block">
                  Controls the Hero countdown timer & main date badge
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Timezone
                </label>
                <input
                  type="text"
                  value={invitationForm.wedding_timezone || 'Asia/Kolkata'}
                  onChange={(e) => setInvitationForm({ ...invitationForm, wedding_timezone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Destination City
                </label>
                <input
                  type="text"
                  value={invitationForm.venue_city || 'Udaipur, Rajasthan'}
                  onChange={(e) => setInvitationForm({ ...invitationForm, venue_city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                Hero Tagline
              </label>
              <input
                type="text"
                value={invitationForm.tagline || ''}
                onChange={(e) => setInvitationForm({ ...invitationForm, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                Celestial Quote
              </label>
              <textarea
                rows={2}
                value={invitationForm.celestial_quote || ''}
                onChange={(e) => setInvitationForm({ ...invitationForm, celestial_quote: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none focus:border-[#D7B46A] resize-none"
              />
            </div>

            {/* Atmospheric Wedding Soundtrack Module */}
            <div className="p-5 rounded-2xl border border-[#D7B46A]/40 bg-gradient-to-r from-[#200A16] to-[#160710] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#D7B46A]/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#3D0B14] border border-[#D7B46A]/40 flex items-center justify-center text-[#F3E5AB]">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-title text-base sm:text-lg text-[#F3E5AB]">
                      Wedding Music & Atmospheric Soundtrack
                    </h4>
                    <p className="text-[11px] text-[#D7B46A]/80">
                      Plays auspicious background music when guests open the royal invitation
                    </p>
                  </div>
                </div>
                <span className="px-3 py-0.5 rounded-full bg-[#3D0B14] border border-[#D7B46A]/50 text-[11px] text-[#F3E5AB]">
                  Background Audio
                </span>
              </div>

              {/* Live Audio Preview Card */}
              <div className="p-4 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <audio
                  ref={audioPreviewRef}
                  src={invitationForm.audio_url || '/audio/shehnai_vivah.mp3'}
                  preload="none"
                  onPlay={() => setIsPreviewPlaying(true)}
                  onPause={() => setIsPreviewPlaying(false)}
                  onEnded={() => setIsPreviewPlaying(false)}
                />
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={togglePreviewAudio}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FACC15] via-[#EAB308] to-[#CA8A04] text-[#451A03] flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer shrink-0"
                    title={isPreviewPlaying ? 'Pause Audio Preview' : 'Play Audio Preview'}
                  >
                    {isPreviewPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Disc className={`w-3.5 h-3.5 text-[#D7B46A] ${isPreviewPlaying ? 'animate-spin' : ''}`} />
                      <span className="text-xs font-bold text-[#F5ECDD] truncate">
                        {invitationForm.audio_title || 'Shehnai & Sitar — Auspicious Vivah Dhun'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#D7B46A]/70 truncate mt-0.5">
                      {isPreviewPlaying ? '▶ Playing Audio Preview...' : 'Click to test playback'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {/* Upload Audio File Button */}
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-gradient-to-r from-[#D7B46A] to-[#B89648] text-[#1D060A] text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-sm">
                    {isUploadingAudio ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading Audio...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Audio File (.mp3, .wav)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="audio/mp3,audio/wav,audio/ogg,audio/m4a,audio/*"
                      className="hidden"
                      disabled={isUploadingAudio}
                      onChange={handleAudioFileUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Track Title and Direct URL inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                    Soundtrack Display Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shehnai & Sitar — Auspicious Vivah Dhun"
                    value={invitationForm.audio_title || ''}
                    onChange={(e) => setInvitationForm({ ...invitationForm, audio_title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-xs focus:outline-none focus:border-[#D7B46A]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                    Audio Stream URL (.mp3 or local path)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. /audio/shehnai_vivah.mp3 or https://..."
                      value={invitationForm.audio_url || ''}
                      onChange={(e) => setInvitationForm({ ...invitationForm, audio_url: e.target.value })}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-xs focus:outline-none focus:border-[#D7B46A]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setInvitationForm({
                          ...invitationForm,
                          audio_url: '/audio/shehnai_vivah.mp3',
                          audio_title: 'Shehnai & Sitar — Auspicious Vivah Dhun',
                        })
                      }
                      className="px-3 py-2 rounded-xl bg-[#3D0B14] text-[#F3E5AB] text-xs hover:bg-[#52101B] border border-[#D7B46A]/30 transition-all cursor-pointer whitespace-nowrap"
                      title="Reset to default auspicious Vivah Shehnai"
                    >
                      Default
                    </button>
                  </div>
                </div>
              </div>

              {/* Show / Hide Floating Music Control Button on Wedding Site */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3D0B14] border border-[#D7B46A]/40 flex items-center justify-center text-[#F3E5AB] shrink-0">
                    <Volume2 className="w-4 h-4 text-[#D7B46A]" />
                  </div>
                  <div>
                    <label htmlFor="show_audio_controls_toggle" className="text-xs font-bold text-[#F5ECDD] block cursor-pointer">
                      Show Music Control Button on Website (फ्लोटिंग म्यूजिक बटन)
                    </label>
                    <span className="text-[11px] text-[#D7B46A]/75 block">
                      Enable or disable the floating play/pause music controller for guests on the live invitation site
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    id="show_audio_controls_toggle"
                    checked={invitationForm.theme_settings?.show_audio_controls !== false}
                    onChange={(e) => {
                      const updated = {
                        ...(invitationForm.theme_settings || {}),
                        show_audio_controls: e.target.checked,
                      };
                      setInvitationForm({ ...invitationForm, theme_settings: updated });
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#251020] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#FEF08A] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#EAB308] peer-checked:to-[#CA8A04] border border-[#D7B46A]/40"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="is_published"
                checked={!!invitationForm.is_published}
                onChange={(e) => setInvitationForm({ ...invitationForm, is_published: e.target.checked })}
                className="w-4 h-4 accent-[#D7B46A] cursor-pointer"
              />
              <label htmlFor="is_published" className="text-xs text-[#F5ECDD] font-medium cursor-pointer">
                Publicly Published (Guests can open and view invitation via slug)
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-semibold tracking-wider uppercase border border-[#D7B46A]/50 shadow-md cursor-pointer"
              >
                Save Invitation Settings
              </button>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB: BRIDE'S FAMILY (वधू पक्ष) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'bride_family' && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D7B46A] block">
                  वधू पक्ष परिचय एवं परिवार
                </span>
                <h3 className="font-title text-xl text-[#F3E5AB]">Bride's Family & Kinsfolk Management</h3>
                <p className="text-xs text-[#F5ECDD]/60 font-body mt-0.5">
                  Manage all venerable family members of the Bride (Parents, Grandparents, Brothers, Aunts, Uncles, and Welcoming Relatives).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetDefaultFamily}
                  className="px-3.5 py-2 rounded-xl bg-[#1A0E1A] hover:bg-[#2A1528] text-xs text-[#D7B46A] border border-[#D7B46A]/30 transition-colors cursor-pointer"
                  title="Reset to default family listing"
                >
                  Reset Defaults
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingFamilyMember({
                      id: `bf-${Date.now()}`,
                      name: '',
                      relation: '',
                      category: 'parents',
                      note: '',
                    });
                    setIsFamilyModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-semibold tracking-wider uppercase border border-[#D7B46A]/40 shadow hover:shadow-lg transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Family Member</span>
                </button>
              </div>
            </div>

            {/* Family Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {((invitationForm.theme_settings?.bride_family && invitationForm.theme_settings.bride_family.length > 0)
                ? invitationForm.theme_settings.bride_family
                : DEFAULT_BRIDE_FAMILY
              ).map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="p-5 rounded-2xl border border-[#D7B46A]/30 bg-gradient-to-br from-[#1C0F1E] to-[#120815] shadow-lg flex flex-col justify-between hover:border-[#D7B46A]/60 transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#3D0B14] text-[#F3E5AB] border border-[#D7B46A]/40">
                        {member.relation}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#D7B46A]/70">
                        {member.category}
                      </span>
                    </div>

                    <h4 className="font-title text-base sm:text-lg text-[#F5ECDD] tracking-wide mb-1">
                      {member.name}
                    </h4>

                    {member.note ? (
                      <p className="text-xs text-[#F5ECDD]/70 italic mt-2 border-l-2 border-[#D7B46A]/40 pl-2.5">
                        “{member.note}”
                      </p>
                    ) : (
                      <p className="text-xs text-[#F5ECDD]/40 mt-2">—</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFamilyMember(member);
                        setIsFamilyModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#D7B46A] text-xs transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFamilyMember(member.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Adding / Editing Family Member */}
            {isFamilyModalOpen && editingFamilyMember && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
                <form
                  onSubmit={handleSaveFamilyMember}
                  className="w-full max-w-lg p-6 sm:p-7 rounded-2xl bg-[#160D19] border border-[#D7B46A]/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                >
                  <div className="border-b border-[#D7B46A]/20 pb-3 flex items-center justify-between">
                    <h4 className="font-title text-lg text-[#F3E5AB]">
                      {editingFamilyMember.id &&
                      (invitationForm.theme_settings?.bride_family || DEFAULT_BRIDE_FAMILY).some(
                        (f) => f.id === editingFamilyMember.id
                      )
                        ? "Edit Bride's Family Member"
                        : "Add Member to Bride's Family (वधू पक्ष)"}
                    </h4>
                    <span className="text-[10px] font-mono uppercase text-[#D7B46A]">
                      वधू पक्ष
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                      Member Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shri Dharmendra Singh"
                      value={editingFamilyMember.name || ''}
                      onChange={(e) =>
                        setEditingFamilyMember({ ...editingFamilyMember, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-xs sm:text-sm text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                      Relation / Honorific (e.g. पिताजी, माताजी, चाचाजी, भाई) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. पिताजी (Father)"
                      value={editingFamilyMember.relation || ''}
                      onChange={(e) =>
                        setEditingFamilyMember({ ...editingFamilyMember, relation: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-xs sm:text-sm text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                    />

                    {/* Quick suggestion tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[
                        'पिताजी (Father)',
                        'माताजी (Mother)',
                        'दादाजी (Grandfather)',
                        'दादीजी (Grandmother)',
                        'चाचाजी (Uncle)',
                        'चाचीजी (Aunt)',
                        'भाई (Brother)',
                        'भाभी (Sister-in-Law)',
                        'बहन (Sister)',
                        'दर्शनाभिलाषी (Welcoming Relative)',
                      ].map((rel) => (
                        <button
                          key={rel}
                          type="button"
                          onClick={() => setEditingFamilyMember({ ...editingFamilyMember, relation: rel })}
                          className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-[#651B2B]/60 text-[10px] text-[#F3E5AB] border border-white/10 transition-colors cursor-pointer"
                        >
                          {rel}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                      Kinship Category
                    </label>
                    <select
                      value={editingFamilyMember.category || 'parents'}
                      onChange={(e) =>
                        setEditingFamilyMember({
                          ...editingFamilyMember,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-xs sm:text-sm text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                    >
                      <option value="parents">Parents (माता-पिता)</option>
                      <option value="grandparents">Grandparents (दादा-दादी / नाना-नानी)</option>
                      <option value="uncles">Uncles & Aunts (चाचा-चाची / ताऊ-ताई)</option>
                      <option value="siblings">Brothers & Sisters (भाई-बहन)</option>
                      <option value="welcoming">Welcoming Family (दर्शनाभिलाषी)</option>
                      <option value="other">Extended Kinsfolk & Well-Wishers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1 font-medium">
                      Blessing / Note / Residence
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Warmly awaiting your gracious presence and blessings"
                      value={editingFamilyMember.note || ''}
                      onChange={(e) =>
                        setEditingFamilyMember({ ...editingFamilyMember, note: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-xs sm:text-sm text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFamilyModalOpen(false);
                        setEditingFamilyMember(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#F5ECDD]/80 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-semibold uppercase tracking-wider border border-[#D7B46A]/40 shadow cursor-pointer"
                    >
                      Save Family Member
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: CEREMONIES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-title text-xl text-[#F3E5AB]">Wedding Ceremonies</h3>
                <p className="text-xs text-[#F5ECDD]/60 font-body">
                  Haldi, Mehendi, Sangeet, Vedic Wedding & Reception
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingEvent({
                    title: '',
                    event_type: 'haldi',
                    event_date: '2026-11-26',
                    start_time: '10:00 AM',
                    venue_name: '',
                    description: '',
                    dress_code: '',
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-medium tracking-wider uppercase border border-[#D7B46A]/40 shadow cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ceremony</span>
              </button>
            </div>

            {/* Ceremonies List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventsList.map((event) => (
                <div
                  key={event.id}
                  className="p-5 rounded-2xl border border-[#D7B46A]/30 bg-[#160D19] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider bg-[#651B2B]/40 text-[#D7B46A] border border-[#D7B46A]/30">
                        {event.event_type}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingEvent(event)}
                          className="p-1 text-[#F5ECDD]/70 hover:text-[#D7B46A] cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1 text-[#F5ECDD]/70 hover:text-rose-400 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-title text-lg text-[#F5ECDD] mb-1">{event.title}</h4>
                    <p className="text-xs text-[#F5ECDD]/70 line-clamp-2 mb-3">{event.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs text-[#F5ECDD]/70 space-y-1">
                    <div>📅 {event.event_date} • {event.start_time}</div>
                    <div>📍 {event.venue_name}</div>
                    {event.dress_code && <div>👔 Dress: {event.dress_code}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Editing / Creating Event */}
            {editingEvent && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <form
                  onSubmit={handleSaveEvent}
                  className="w-full max-w-lg p-6 rounded-2xl bg-[#160D19] border border-[#D7B46A]/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                >
                  <h4 className="font-title text-lg text-[#F3E5AB]">
                    {editingEvent.id ? 'Edit Ceremony' : 'New Ceremony'}
                  </h4>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Ceremony Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingEvent.title || ''}
                      onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                        Ceremony Type
                      </label>
                      <select
                        value={editingEvent.event_type || 'haldi'}
                        onChange={(e) => setEditingEvent({ ...editingEvent, event_type: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                      >
                        <option value="haldi">Haldi</option>
                        <option value="mehendi">Mehendi</option>
                        <option value="sangeet">Sangeet</option>
                        <option value="wedding">Wedding / Pheras</option>
                        <option value="reception">Reception</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                        Event Date (YYYY-MM-DD)
                      </label>
                      <input
                        type="date"
                        required
                        value={editingEvent.event_date || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, event_date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                      >
                      </input>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                        Start Time
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="10:00 AM"
                        value={editingEvent.start_time || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, start_time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                        End Time
                      </label>
                      <input
                        type="text"
                        placeholder="01:00 PM"
                        value={editingEvent.end_time || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, end_time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editingEvent.venue_name || ''}
                      onChange={(e) => setEditingEvent({ ...editingEvent, venue_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingEvent.description || ''}
                      onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Dress Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Yellows & Ochre"
                      value={editingEvent.dress_code || ''}
                      onChange={(e) => setEditingEvent({ ...editingEvent, dress_code: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="px-4 py-2 rounded-xl text-xs text-[#F5ECDD]/60 hover:text-[#F5ECDD] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-semibold uppercase tracking-wider border border-[#D7B46A]/40 cursor-pointer shadow"
                    >
                      Save Ceremony
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: STORY MILESTONES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-title text-xl text-[#F3E5AB]">Story Milestones</h3>
                <p className="text-xs text-[#F5ECDD]/60 font-body">
                  Editorial timeline chronicles of the couple's journey
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingStory({
                    title: '',
                    date_label: '',
                    subtitle: '',
                    description: '',
                    image_url: '',
                    quote: '',
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-medium tracking-wider uppercase border border-[#D7B46A]/40 shadow cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {storiesList.map((story) => (
                <div
                  key={story.id}
                  className="p-5 rounded-2xl border border-[#D7B46A]/30 bg-[#160D19] flex flex-col sm:flex-row items-start gap-4"
                >
                  {story.image_url && (
                    <img
                      src={story.image_url}
                      alt={story.title}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 border border-[#D7B46A]/30"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#D7B46A]">
                        {story.date_label}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingStory(story)}
                          className="p-1 text-[#F5ECDD]/70 hover:text-[#D7B46A] cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteStory(story.id)}
                          className="p-1 text-[#F5ECDD]/70 hover:text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="font-title text-lg text-[#F5ECDD] mb-1">{story.title}</h4>
                    <p className="text-xs text-[#F5ECDD]/70 mb-2">{story.description}</p>
                    {story.quote && (
                      <div className="text-xs text-[#D7B46A] italic">“{story.quote}”</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Editing / Creating Story */}
            {editingStory && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <form
                  onSubmit={handleSaveStory}
                  className="w-full max-w-lg p-6 rounded-2xl bg-[#160D19] border border-[#D7B46A]/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
                >
                  <h4 className="font-title text-lg text-[#F3E5AB]">
                    {editingStory.id ? 'Edit Story Milestone' : 'New Story Milestone'}
                  </h4>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingStory.title || ''}
                      onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                        Date Label
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Autumn 2021"
                        value={editingStory.date_label || ''}
                        onChange={(e) => setEditingStory({ ...editingStory, date_label: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                        Subtitle / Location
                      </label>
                      <input
                        type="text"
                        placeholder="Oxford Library, London"
                        value={editingStory.subtitle || ''}
                        onChange={(e) => setEditingStory({ ...editingStory, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={editingStory.image_url || ''}
                      onChange={(e) => setEditingStory({ ...editingStory, image_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingStory.description || ''}
                      onChange={(e) => setEditingStory({ ...editingStory, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Quote
                    </label>
                    <input
                      type="text"
                      placeholder="“Some moments are written in ancient ink...”"
                      value={editingStory.quote || ''}
                      onChange={(e) => setEditingStory({ ...editingStory, quote: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingStory(null)}
                      className="px-4 py-2 rounded-xl text-xs text-[#F5ECDD]/60 hover:text-[#F5ECDD] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-semibold uppercase tracking-wider border border-[#D7B46A]/40 cursor-pointer shadow"
                    >
                      Save Milestone
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: GALLERY MEDIA */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-title text-xl text-[#F3E5AB]">Gallery Media</h3>
                <p className="text-xs text-[#F5ECDD]/60 font-body">
                  High-resolution photo and video curation
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingGallery({
                    title: '',
                    caption: '',
                    media_type: 'image',
                    url: '',
                    category: 'couple',
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-medium tracking-wider uppercase border border-[#D7B46A]/40 shadow cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryList.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-[#D7B46A]/30 bg-[#160D19]"
                >
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#D7B46A]">
                      {item.category}
                    </span>
                    <div>
                      <div className="font-title text-xs text-[#F5ECDD] truncate">{item.title}</div>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="mt-2 text-[10px] text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Adding Media */}
            {editingGallery && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <form
                  onSubmit={handleSaveGallery}
                  className="w-full max-w-md p-6 rounded-2xl bg-[#160D19] border border-[#D7B46A]/40 shadow-2xl space-y-4"
                >
                  <h4 className="font-title text-lg text-[#F3E5AB]">Add Media to Gallery</h4>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Royal Portrait"
                      value={editingGallery.title || ''}
                      onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Caption
                    </label>
                    <input
                      type="text"
                      placeholder="Under Udaipur moonlight"
                      value={editingGallery.caption || ''}
                      onChange={(e) => setEditingGallery({ ...editingGallery, caption: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Category
                    </label>
                    <select
                      value={editingGallery.category || 'couple'}
                      onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    >
                      <option value="couple">The Couple</option>
                      <option value="ceremonies">Sacred Ceremonies</option>
                      <option value="cinematic">Palatial & Cinematic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7B46A] mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={editingGallery.url || ''}
                      onChange={(e) => setEditingGallery({ ...editingGallery, url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/30 text-sm text-[#F5ECDD]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setEditingGallery(null)}
                      className="px-4 py-2 rounded-xl text-xs text-[#F5ECDD]/60 hover:text-[#F5ECDD] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-semibold uppercase tracking-wider border border-[#D7B46A]/40 cursor-pointer shadow"
                    >
                      Add Media
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: VENUE & TRAVEL */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'venue' && (
          <form
            onSubmit={handleSaveVenue}
            className="p-6 sm:p-8 rounded-2xl border border-[#D7B46A]/30 bg-[#160D19] shadow-xl space-y-6 max-w-4xl"
          >
            <div>
              <h3 className="font-title text-xl text-[#F3E5AB]">Venue & Travel Logistics</h3>
              <p className="text-xs text-[#F5ECDD]/60 font-body mt-1">
                Directions, parking, luxury accommodation arrangements, ferry details, and concierge desk.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Venue Name
                </label>
                <input
                  type="text"
                  required
                  value={venueForm.venue_name || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, venue_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Subheading
                </label>
                <input
                  type="text"
                  value={venueForm.venue_sub_heading || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, venue_sub_heading: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                Full Physical Address
              </label>
              <textarea
                rows={2}
                required
                value={venueForm.address || ''}
                onChange={(e) => setVenueForm({ ...venueForm, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Google Maps Directions Link
                </label>
                <input
                  type="text"
                  value={venueForm.map_directions_url || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, map_directions_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Google Maps Embed URL
                </label>
                <input
                  type="text"
                  value={venueForm.map_embed_url || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, map_embed_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-[#F5ECDD] text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Parking Information
                </label>
                <textarea
                  rows={2}
                  value={venueForm.parking_info || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, parking_info: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Accommodation Details
                </label>
                <textarea
                  rows={2}
                  value={venueForm.accommodation_info || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, accommodation_info: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Ferry & Transport Info
                </label>
                <textarea
                  rows={2}
                  value={venueForm.transport_info || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, transport_info: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Concierge Name
                </label>
                <input
                  type="text"
                  value={venueForm.contact_name || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, contact_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Concierge Phone
                </label>
                <input
                  type="text"
                  value={venueForm.contact_phone || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, contact_phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D7B46A] mb-1 font-medium">
                  Concierge Email
                </label>
                <input
                  type="email"
                  value={venueForm.contact_email || ''}
                  onChange={(e) => setVenueForm({ ...venueForm, contact_email: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#120A14] border border-[#D7B46A]/25 text-xs text-[#F5ECDD]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#651B2B] to-[#E34236] text-[#F5ECDD] text-xs font-semibold tracking-wider uppercase border border-[#D7B46A]/50 shadow cursor-pointer"
              >
                Save Venue & Travel Info
              </button>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 7: RSVP GUEST LIST */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'rsvps' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-title text-xl text-[#F3E5AB]">RSVP Submissions</h3>
                <p className="text-xs text-[#F5ECDD]/60 font-body">
                  Guest list, attendance records, dietary notes and party sizes
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A0E1A] hover:bg-[#281428] border border-[#D7B46A]/40 text-[#D7B46A] text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#D7B46A]/60 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by guest name or email..."
                  value={rsvpSearch}
                  onChange={(e) => setRsvpSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#160D19] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none focus:border-[#D7B46A]"
                />
              </div>

              <select
                value={rsvpFilterStatus}
                onChange={(e) => setRsvpFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-xl bg-[#160D19] border border-[#D7B46A]/25 text-xs text-[#F5ECDD] focus:outline-none"
              >
                <option value="all">All Attendance</option>
                <option value="attending">Attending</option>
                <option value="declined">Declined</option>
                <option value="tentative">Tentative</option>
              </select>
            </div>

            {/* Full RSVP Table */}
            <div className="rounded-2xl border border-[#D7B46A]/30 bg-[#160D19] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#120A14] border-b border-white/10 text-[#D7B46A] font-mono uppercase tracking-wider">
                      <th className="py-3 px-4">Guest Name</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Guests</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Ceremonies Selected</th>
                      <th className="py-3 px-4">Dietary / Message</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-white/5">
                        <td className="py-3.5 px-4 font-medium text-[#F5ECDD]">
                          {rsvp.guest_name}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                              rsvp.attendance_status === 'attending'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : rsvp.attendance_status === 'declined'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {rsvp.attendance_status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono">{rsvp.guest_count}</td>
                        <td className="py-3.5 px-4 text-[#F5ECDD]/70">
                          {rsvp.email && <div>{rsvp.email}</div>}
                          {rsvp.phone && <div className="text-[11px] text-[#D7B46A]">{rsvp.phone}</div>}
                          {!rsvp.email && !rsvp.phone && '—'}
                        </td>
                        <td className="py-3.5 px-4 text-[#F5ECDD]/70 max-w-xs truncate">
                          {Array.isArray(rsvp.selected_events) && rsvp.selected_events.length > 0
                            ? rsvp.selected_events.join(', ')
                            : 'All Ceremonies'}
                        </td>
                        <td className="py-3.5 px-4 text-[#F5ECDD]/70 max-w-xs">
                          {rsvp.dietary_notes && (
                            <div className="text-[#F3E5AB]">Diet: {rsvp.dietary_notes}</div>
                          )}
                          {rsvp.message && <div className="italic text-[11px]">“{rsvp.message}”</div>}
                          {!rsvp.dietary_notes && !rsvp.message && '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteRsvp(rsvp.id)}
                            className="p-1.5 text-[#F5ECDD]/60 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete RSVP"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredRsvps.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-[#F5ECDD]/50">
                          No matching RSVP submissions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
