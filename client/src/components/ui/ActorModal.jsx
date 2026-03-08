import React, { useEffect, useState } from 'react';
import { X, Loader } from 'lucide-react';
import { fetchPersonDetails } from '../../utils/movieApi';

const ActorModal = ({ actorId, onClose }) => {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPerson = async () => {
            try {
                setLoading(true);
                const data = await fetchPersonDetails(actorId);
                setPerson(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (actorId) getPerson();
    }, [actorId]);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#000]/80 p-4 transition-all">
            <div className="relative w-full max-w-2xl bg-primary-bg rounded-2xl overflow-hidden shadow-2xl border border-border-color overflow-y-auto max-h-[90vh] glass-light animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-secondary-bg text-text-primary rounded-full hover:bg-red-500 hover:text-white transition-colors border border-border-color hover:border-red-500"
                >
                    <X size={20} />
                </button>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader className="w-10 h-10 text-accent-gold animate-spin mb-4" />
                        <p className="text-text-secondary">Loading details...</p>
                    </div>
                ) : !person ? (
                    <div className="p-8 text-center text-text-primary">Failed to load actor details</div>
                ) : (
                    <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6">
                        <div className="w-full md:w-1/3 shrink-0">
                            <img
                                src={person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Photo'}
                                alt={person.name}
                                className="w-full rounded-xl shadow-lg border border-border-color object-cover aspect-[2/3]"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-text-primary mb-1">{person.name}</h2>
                            <p className="text-accent-gold font-medium mb-4">{person.known_for_department}</p>

                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                {person.birthday && (
                                    <div>
                                        <p className="text-text-secondary">Born</p>
                                        <p className="font-semibold text-text-primary">{person.birthday}</p>
                                    </div>
                                )}
                                {person.place_of_birth && (
                                    <div>
                                        <p className="text-text-secondary">Place of Birth</p>
                                        <p className="font-semibold text-text-primary">{person.place_of_birth}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-text-primary mb-2 border-b border-border-color pb-1">Biography</h3>
                                <p className="text-text-secondary text-sm leading-relaxed max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                                    {person.biography || "No biography available."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActorModal;
